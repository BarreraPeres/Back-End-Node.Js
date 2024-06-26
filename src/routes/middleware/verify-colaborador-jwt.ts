import { FastifyReply, FastifyRequest } from "fastify";

export function verifyRoleJwt(roleToVerify: "colaborador") {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify();

            const { role } = request.user

            if (role !== roleToVerify) {
                return reply.status(403).send({ message: "Acesso não autorizado" });
            }
        } catch (err) {
            return reply.status(401).send({ message: "Token inválido ou expirado" });
        }
    };
}
