import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middleware/verify-jwt";
import { prisma } from "../../../config/prisma";
import { z } from "zod";

export async function perfilAluno(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .get("/perfil/aluno", {
            onRequest: [verifyJwt],
            schema: {
                tags: ["alunos"],
                description: "Aluno Autenticado busca seu perfil e suas informaçoes",
                response: {
                    200: z.object({
                        aluno: z.object({
                            nome: z.string(),
                            ra: z.number().int(),
                            telefone: z.string().nullable(),
                            email: z.string(),
                        })
                    })
                }
            }
        }, async (request, reply) => {

            const aluno = await prisma.aluno.findUnique({
                where: {
                    id: parseInt(request.user.sub)
                }
            })

            if (!aluno) {
                throw new Error()
            }
            reply.send({
                aluno: {
                    id: aluno.id,
                    nome: aluno.nome,
                    email: aluno.email,
                    ra: aluno.ra,
                    telefone: aluno.telefone
                }
            })
        })
}
