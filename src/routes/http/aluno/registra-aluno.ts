import { ZodTypeProvider } from "fastify-type-provider-zod"
import { number, z } from "zod"
import { geradorRa } from "../../../utils/gerador-ra"
import { geradorEmail } from "../../../utils/gerador-email"
import { prisma } from "../../../config/prisma"
import { FastifyInstance } from "fastify"
import pkg from 'bcryptjs';
const { hash } = pkg;


export async function registraAluno(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/aluno', {
      schema: {
        summary: "Registra um aluno",
        tags: ["alunos"],
        description: "dados para o cadastro nome,telefone,senha. Ra e Email, são gerado pelo servidor",
        body: z.object({
          nome: z.string().min(4),
          telefone: z.string().optional(),
          senha: z.string().min(6)
        }),
        response: {
          201: z.object({
            alunoRa: number().int(),
          })
        },
      },
    }, async (request, reply) => {
      const { nome, telefone, senha } = request.body

      const senha_hash = await hash(senha, 6)


      const alunoRa = geradorRa()
      const alunoEmail = geradorEmail(nome, alunoRa)

      const alunos = await prisma.aluno.create({
        data: {
          senha_hash,
          nome,
          telefone,
          ra: alunoRa, //gerado por função
          email: alunoEmail // gerado por funçao
        }
      })

      return reply.status(201).send({ alunoRa: alunos.ra })
    })
}

