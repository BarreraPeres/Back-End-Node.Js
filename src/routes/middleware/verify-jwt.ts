import { FastifyReply, FastifyRequest } from "fastify";
import { BadRequest } from "../_errors/bad-request";

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify()

    } catch (error) {
        return reply.status(401).send({ message: 'Unauthorized.' })
    }
}