import { ZodTypeProvider } from "fastify-type-provider-zod"
import { number, z } from "zod"
import { geradorRa } from "../utils/gerador-ra"
import { geradorEmail } from "../utils/gerador-email"
import { prisma } from "../config/prisma"
import { FastifyInstance } from "fastify"

export async function criarAluno(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/aluno', {
      schema: {
        summary: "Cria um aluno",
        tags: ["alunos"],
        body: z.object({
          nome: z.string().min(4),
          telefone: z.string().optional()
        }),
        response: {
          201: z.object({
            alunoRa: number().int(),
          })
        },
      },
    }, async (request, reply) => {
      const { nome, telefone } = request.body

      const alunoRa = geradorRa()
      const alunoEmail = geradorEmail(nome, alunoRa)

      const alunos = await prisma.aluno.create({
        data: {
          nome,
          telefone,
          ra: alunoRa, //gerado por função
          email: alunoEmail // gerado por funçao
        }
      })

      return reply.status(201).send({ alunoRa: alunos.ra })
    })
}

