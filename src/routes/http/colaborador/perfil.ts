import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middleware/verify-jwt";
import { prisma } from "../../../config/prisma";
import { z } from "zod";
import { BadRequest } from "../../_errors/bad-request";

export async function perfilColaborador(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>()
        .get("/perfil/colaborador", {
            onRequest: [verifyJwt],
            schema: {
                summary: "Perfil do colaborador",
                description: "colaborador Autenticado busca seu perfil e suas informaçoes",
                tags: ["colaborador"],
                response: {
                    200: z.object({
                        colaborador: z.object({
                            cpf: z.number().int(),
                            nome: z.string(),
                            email: z.string().email(),
                            cargo: z.string()
                        })
                    })
                }
            }
        }, async (request, reply) => {

            const colaborador = await prisma.colaborador.findUnique({
                where: {
                    id: parseInt(request.user.sub)
                }
            })

            if (!colaborador) {
                throw new BadRequest("Colaborador Not Found")
            }
            reply.send({
                colaborador: {
                    cpf: colaborador.cpf,
                    nome: colaborador.nome,
                    email: colaborador.email,
                    cargo: colaborador.cargo
                }
            })
        })
}
