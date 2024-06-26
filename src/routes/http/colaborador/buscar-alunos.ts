import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../../config/prisma";
import { verifyRoleJwt } from "../../middleware/verify-colaborador-jwt";



export async function buscarAlunos(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get("/alunos", {
      onRequest: [verifyRoleJwt("colaborador")],
      schema: {
        summary: "Busca todos alunos",
        tags: ["colaborador"],
        description: "Colaborador Autenticado busca alunos paginados",
        querystring: z.object({
          query: z.string().nullish().optional(),
          pageIndex: z.string().nullish().default("0").transform(Number)
        }),
        response: {
          200: z.object({
            alunos: z.array(
              z.object({
                nome: z.string(),
                ra: z.number().int(),
                telefone: z.string().nullable(),
                email: z.string(),
                emprestimos: z.number(),
                emprestimosId: z.array(z.number().int())
              })
            )
          })
        },

      }
    }, async (request, reply) => {

      const querySchema = z.object({
        query: z.string().nullish().optional(),
        pageIndex: z.string().nullish().default("0").transform(Number)
      })

      const { pageIndex, query } = querySchema.parse(request.params)


      const aluno = await prisma.aluno.findMany({
        select: {
          nome: true,
          ra: true,
          telefone: true,
          email: true,
          _count: { select: { Emprestimo: true } },
          Emprestimo: { select: { id: true } }
        },
        take: 10,
        skip: pageIndex * 10,
        where: query ? {
          nome: {
            contains: query
          }
        } : {},

      })
      return reply.send({
        alunos: aluno.map(alunos => {
          return {
            nome: alunos.nome,
            ra: alunos.ra,
            telefone: alunos.telefone,
            email: alunos.email,
            emprestimos: alunos._count.Emprestimo,
            emprestimosId: alunos.Emprestimo.map(e => e.id)
          }
        })
      })
    })
}