import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../../config/prisma";
import { BadRequest } from "../../_errors/bad-request";
import { verifyJwt } from "../../middleware/verify-jwt";

export async function notaEmprestimo(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .get("/:ra/nota", {
            schema: {
                summary: "Busca a nota do emprestimos",
                tags: ["livros"],
                description: "busca a nota pra confirmar o devolvimento com Ra ",
                params: z.object({
                    ra: z.coerce.number().int()
                }),
                response: {
                    200: z.object({
                        emprestimos: z.array(z.object({
                            nomeAluno: z.string(),
                            ra: z.number().int(),
                            emprestimoId: z.number().int(),
                            isbn: z.number().int(),
                            dataEmprestimo: z.date(),
                        }))
                    })
                },
            }
        }, async (request, reply) => {
            const { ra } = request.params

            const busca = await prisma.aluno.findUnique({
                select: {
                    nome: true,
                    ra: true,
                    Emprestimo: {
                        select: {
                            livro: { select: { isbn: true } },
                            id: true, dataEmprestimo: true
                        }
                    }
                },
                where: {
                    ra
                }
            })

            if (busca === null) {
                throw new BadRequest("Nenhum Emprestimo a esse aluno")
            }

            return reply.send({
                emprestimos: busca.Emprestimo.map(emprestimos => {
                    return {
                        nomeAluno: busca.nome,
                        ra: busca.ra,
                        emprestimoId: emprestimos.id,
                        dataEmprestimo: emprestimos.dataEmprestimo,
                        isbn: emprestimos.livro.isbn,
                    }
                })
            })
        })
}