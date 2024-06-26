import fastifyJwt, { FastifyJWTOptions } from '@fastify/jwt'

declare module "@fastify/jwt" {
    export interface FastifyJWT {
        user: {
            sub: string
            role: 'aluno' | 'colaborador'
        } // user type is return type of `request.user` object
    }
}