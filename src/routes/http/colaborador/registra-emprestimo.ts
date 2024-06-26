import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod"
import { prisma } from "../../../config/prisma"
import { calcularDataDevolucaoPadrao } from "../../../utils/calcular-data-padrao";
import { BadRequest } from "../../_errors/bad-request";
import { verifyRoleJwt } from "../../middleware/verify-colaborador-jwt";


export async function registraEmprestimo(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post("/:isbn/emprestimo", {
      onRequest: [verifyRoleJwt("colaborador")],
      schema: {
        summary: "registra o empréstimo",
        tags: ["colaborador"],
        body: z.object({
          dataDevolucao: z.string().datetime().nullable(),
          ra: z.number().int(),
        }),
        params: z.object({
          isbn: z.coerce.number().int() // transformando o livroId pra string pois o parms so recebe string
        }),
        response: {
          201: z.object({
            emprestimoId: z.number().int()
          })
        },
      }

    }, async (request, reply) => {

      const bodySchema = z.object({
        dataDevolucao: z.string().datetime().nullable(),
        ra: z.number().int(),
      })

      const parmsSchema = z.object({
        isbn: z.coerce.number().int(),
      })

      const { dataDevolucao, ra } = bodySchema.parse(request.body)
      const { isbn } = parmsSchema.parse(request.params)


      const [aluno, colaborador, livro] = await Promise.all([
        prisma.aluno.findUnique({
          where: {
            ra: ra
          }
        }),
        prisma.colaborador.findUnique({
          where: { id: parseInt(request.user.sub) }
        }),

        prisma.livro.findUnique({
          where: {
            isbn: isbn
          }
        }),
      ])

      if (!aluno) {
        throw new BadRequest("Aluno Não Encontrado!")
      }
      if (!colaborador) {
        throw new BadRequest("Colaborador Não Encontrado!")
      }

      if (!livro) {
        throw new BadRequest("Livro Não Encontrado")
      }
      if (livro.quantidade <= 0) {
        throw new BadRequest("Livro Não Disponível No Momento")
      }

      // Se dataDevolucao não foi especificada, use o valor padrão (7 dias após a data atual)
      const dataDevolucaoPadrao = dataDevolucao ?? calcularDataDevolucaoPadrao();
      const emprestimo = await prisma.emprestimo.create({
        data: {
          dataDevolucao: dataDevolucaoPadrao,
          alunoId: aluno.id,
          colaboradorId: colaborador.id,
          livroId: livro.id
        }
      })
      // Atualizando a quantidade de livros disponíveis após o empréstimo
      await prisma.livro.update({
        where: {
          isbn: isbn
        },
        data: {
          quantidade: livro.quantidade - 1
        }
      })
      return reply.status(201).send({ emprestimoId: emprestimo.id, })

    })
}