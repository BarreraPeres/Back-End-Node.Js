import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../../config/prisma";
import { compare } from "bcryptjs";
import { BadRequest } from "../../_errors/bad-request";



export async function loginColaborador(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post("/login/colaborador", {
            schema: {
                summary: "Login do colaborador",
                tags: ["login"],
                body: z.object({
                    username: z.string(),
                    senha: z.string()
                }),
                response: {
                    200: z.object({
                        accessToken: z.string()
                    })
                }
            }
        }, async (request, reply) => {
            const { senha, username } = request.body

            const cpf = !isNaN(Number(username))
            const usernameRaOuEmail = cpf ? { cpf: Number(username) } : { email: username }

            const colaborador = await prisma.colaborador.findFirst({
                where: usernameRaOuEmail
            })

            if (!colaborador) {
                throw new BadRequest("Usuário não encontrado")
            }

            const senhaInexistente = await compare(senha, colaborador.senha_hash)

            if (!senhaInexistente) {
                throw new BadRequest("Credenciais inválidas")
            }

            const accessToken = await reply.jwtSign(
                {
                    role: "colaborador"
                }, {
                sign: {
                    sub: colaborador.id.toString(),
                }
            })


            const refreshToken = await reply.jwtSign(
                {
                    role: "colaborador"
                }, {
                sign: {
                    sub: colaborador.id.toString(),
                    expiresIn: "7d"
                }
            })

            return reply.setCookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: true,
                path: "/"
            }).status(200).send({ accessToken })
        })
}