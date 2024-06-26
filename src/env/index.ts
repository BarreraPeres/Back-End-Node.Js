import "dotenv"
import z from "zod"
import { BadRequest } from "../routes/_errors/bad-request"

const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
    JWT_SECRET: z.string()
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    throw new BadRequest("Erro nas variáveis de ambiente")
}



export const env = _env.data