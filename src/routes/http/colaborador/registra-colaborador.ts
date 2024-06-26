import { ZodTypeProvider } from "fastify-type-provider-zod";
import { number, z } from "zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../../../config/prisma";
import pkg from 'bcryptjs';
const { hash } = pkg;


export async function registraColaborador(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>()
    .post("/colaboradores", {
      schema: {
        summary: "Registra o colaborador",
        tags: ["colaborador"],
        description: "dados para o cadastro cpf,nome,email,cargo,senha",
        body: z.object({
          cpf: z.number().int().min(4),
          nome: z.string().min(4),
          email: z.string().email(),
          cargo: z.string(),
          senha: z.string().min(6)
        }),
        response: {
          201: z.object({
            colaboradorId: number().int()
          })
        }
      }
    }, async (request, reply) => {
      const { cpf, nome, email, cargo, senha } = request.body

      const senha_hash = await hash(senha, 6)

      const novoColaborador = await prisma.colaborador.create({
        data: {
          cpf,
          nome,
          email,
          cargo,
          senha_hash
        }
      })
      return reply.status(201).send({ colaboradorId: novoColaborador.id })

    })
}