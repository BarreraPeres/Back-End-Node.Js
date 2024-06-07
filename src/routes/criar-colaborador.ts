import { ZodTypeProvider } from "fastify-type-provider-zod";
import { number, z } from "zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../config/prisma";


export async function criarColaborador(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>()
    .post("/colaboradores", {
      schema: {
        summary: "Cria o colaborador",
        tags: ["colaborador"],
        body: z.object({
          cpf: z.number().int().min(4),
          nome: z.string().min(4),
          email: z.string().email(),
          cargo: z.string()
        }),
        response: {
          201: z.object({
            colaboradorId: number().int()
          })
        }
      }
    }, async (request, reply) => {
      const { cpf, nome, email, cargo } = request.body
      const novoColaborador = await prisma.colaborador.create({
        data: {
          cpf,
          nome,
          email,
          cargo
        }
      })
      return reply.status(201).send({ colaboradorId: novoColaborador.id })

    })
}