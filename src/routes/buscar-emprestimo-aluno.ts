import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../config/prisma";
import { BadRequest } from "./_errors/bad-request";

export async function buscarEmprestimoAluno(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get("/:alunoRa/emprestimo", {
      schema: {
        summary: "Busca um emprestimo",
        tags: ["emprestimos"],
        params: z.object({
          alunoRa: z.coerce.number().int()
        }),
        response: {
          200: z.object({
            emprestimos: z.array(z.object({
              nomeAluno: z.string(),
              emprestimoId: z.number().int(),
              dataEmprestimo: z.date(),
              dataDevolução: z.date().nullable(),
              isbn: z.number().int(),
              nome: z.string(),
              autor: z.string(),
            }))
          })
        },
      }
    }, async (request, reply) => {
      const { alunoRa } = request.params

      const busca = await prisma.aluno.findUnique({
        select: {
          nome: true,
          Emprestimo: {
            select: {
              livro: { select: { isbn: true, nome: true, autor: true } },
              id: true, dataEmprestimo: true, dataDevolucao: true
            }
          }
        },
        where: {
          ra: alunoRa
        }
      })

      if (busca === null) {
        throw new BadRequest("Nenhum Emprestimo a esse aluno")
      }

      return reply.send({
        emprestimos: busca.Emprestimo.map(emprestimos => {
          return {
            nomeAluno: busca.nome,
            emprestimoId: emprestimos.id,
            dataEmprestimo: emprestimos.dataEmprestimo,
            dataDevolução: emprestimos.dataDevolucao,
            isbn: emprestimos.livro.isbn,
            nome: emprestimos.livro.nome,
            autor: emprestimos.livro.autor,
          }
        })
      })
    })
}