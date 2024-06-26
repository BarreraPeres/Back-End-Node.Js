import { FastifyInstance } from "fastify";


export async function refresh(app: FastifyInstance) {
    app.patch("/refresh/token", {
        schema: {
            summary: "rota para gerar novos tokens de acesso utilizando o token de atualização presente nos cookies",
            tags: ["login"],
        },
    }, async (request, reply) => {
        await request.jwtVerify({ onlyCookie: true })
        const { role } = request.user


        const accessToken = await reply.jwtSign(
            {
                role: role,
            }, {
            sign: {
                sub: request.user.sub

            }
        })

        const refreshToken = await reply.jwtSign(
            {
                role: role,
            }, {
            sign: {
                sub: request.user.sub,
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