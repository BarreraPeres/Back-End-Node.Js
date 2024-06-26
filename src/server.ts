
import fastify from "fastify";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import fastifiCors from "@fastify/cors"

import { registraAluno } from "./routes/http/aluno/registra-aluno";
import { criarLivro } from "./routes/http/livro/criar-livro";
import { registraColaborador } from "./routes/http/colaborador/registra-colaborador";
import { registraEmprestimo } from "./routes/http/colaborador/registra-emprestimo";
import { buscarLivros } from "./routes/http/livro/buscar-livros";
import { buscarAlunos } from "./routes/http/colaborador/buscar-alunos";
import { buscarEmprestimoAluno } from "./routes/http/aluno/buscar-emprestimo-aluno";
import { devolverEmprestimo } from "./routes/http/livro/devolver-emprestimo";
import { errorHandler } from "./error-handler";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { loginAluno } from "./routes/http/aluno/login-aluno";
import { perfilAluno } from "./routes/http/aluno/perfil";
import { env } from "./env";
import { loginColaborador } from "./routes/http/colaborador/login-colaborador";
import { perfilColaborador } from "./routes/http/colaborador/perfil";
import { notaEmprestimo } from "./routes/http/livro/nota-emprestimo";
import { refresh } from "./routes/http/refresh-token";


export const app = fastify()

app.register(fastifiCors, {
    origin: "*"
})

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: "refreshToken",
        signed: false,
    },
    sign: {
        expiresIn: "10m"
    }
})

app.register(fastifyCookie, {

})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


app.register(fastifySwagger, {
    swagger: {
        consumes: ["application/json"],
        produces: ["aplication/json"],
        info: {
            title: "API-Back-End",
            description: "Back-End para gerenciar empréstimos de livros para os alunos em uma universidade",
            version: "1.0.0",
        }
    },
    transform: jsonSchemaTransform
})
app.register(fastifySwaggerUi, {
    routePrefix: "/docs"
})



app.register(registraAluno, { prefix: '/biblioteca' })
app.register(criarLivro, { prefix: '/biblioteca' })
app.register(registraColaborador, { prefix: '/biblioteca' })
app.register(registraEmprestimo, { prefix: '/biblioteca' })
app.register(buscarLivros, { prefix: '/biblioteca' })
app.register(buscarAlunos, { prefix: '/biblioteca' })
app.register(buscarEmprestimoAluno, { prefix: '/biblioteca' })
app.register(devolverEmprestimo, { prefix: '/biblioteca' })
app.register(loginAluno, { prefix: '/biblioteca' })
app.register(perfilAluno, { prefix: '/biblioteca' })
app.register(loginColaborador, { prefix: '/biblioteca' })
app.register(perfilColaborador, { prefix: '/biblioteca' })
app.register(notaEmprestimo, { prefix: '/biblioteca' })
app.register(refresh, { prefix: '/biblioteca' })

app.setErrorHandler(errorHandler)

app.listen({ port: env.PORT || 3333, host: "0.0.0.0" }).then(() => {
    console.log("SERVER RUNNING🚀");
})


