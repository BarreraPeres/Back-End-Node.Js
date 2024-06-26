import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../../config/prisma";
import { BadRequest } from "../../_errors/bad-request";

export async function devolverEmprestimo(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .put("/:emprestimoId/devolucao", {
      schema: {
        summary: "Devolve o empréstimo",
        tags: ["livros"],
        description: "dados para o devolvimento do livro; emprestimoId, isbn e ra",
        params: z.object({
          emprestimoId: z.coerce.number().int()
        }),
        body: z.object({
          ra: z.number(),
          isbn: z.number().int()
        })
      }
    }, async (request, reply) => {
      const { emprestimoId } = request.params
      const { ra, isbn } = request.body

      const [emprestimo, aluno, livro] = await Promise.all([
        prisma.emprestimo.findUnique({

          where: {
            id: emprestimoId,
          },
        }),
        prisma.aluno.findUnique({
          where: {
            ra: ra
          }
        }),

        prisma.livro.findUnique({
          where: {
            isbn
          }
        })
      ])



      if (!emprestimo) {
        throw new BadRequest("Empréstimo Não Encontrado!");
      }
      if (!aluno) {
        throw new BadRequest("Aluno Não Encontrado!");
      }
      if (!livro) {
        throw new BadRequest("Livro Não Encontrado!")
      }

      if (emprestimo.dataEmprestimo === null) {
        throw new BadRequest("Livro Já Devolvido!");
      }

      await prisma.emprestimo.delete({
        where: {
          id: emprestimoId
        }
      })

      await prisma.livro.update({
        where: {
          id: livro.id
        },
        data: {
          quantidade: livro.quantidade + 1 // Atualizando a quantidade de livros disponíveis
        }
      })
      return reply.status(200).send({ message: "Livro devolvido com sucesso" });
    })
}