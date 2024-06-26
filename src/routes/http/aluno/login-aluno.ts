import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../../config/prisma";
import { compare } from "bcryptjs";
import { BadRequest } from "../../_errors/bad-request";


export async function loginAluno(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post("/login/aluno", {
            schema: {
                summary: "Login do aluno",
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

            const ra = !isNaN(Number(username))
            const usernameRaOuEmail = ra ? { ra: Number(username) } : { email: username }

            const aluno = await prisma.aluno.findFirst({
                where: usernameRaOuEmail
            })

            if (!aluno) {
                throw new BadRequest("Usuário não encontrado")
            }

            const senhaInexistente = await compare(senha, aluno.senha_hash)

            if (!senhaInexistente) {
                throw new BadRequest("Credenciais inválidas")
            }

            const accessToken = await reply.jwtSign(
                {
                    role: "aluno"
                }, {
                sign: {
                    sub: aluno.id.toString(),
                }
            })

            const refreshToken = await reply.jwtSign(
                {
                    role: "aluno"
                }, {
                sign: {
                    sub: aluno.id.toString(),
                    expiresIn: "7d"
                }
            })


            return reply.setCookie("refreshToken", refreshToken, {
                httpOnly: true,
                path: "/",
                secure: true,
                sameSite: true
            }).status(200).send({ accessToken })

        })
}