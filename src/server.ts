
import fastify from "fastify";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import fastifiCors from "@fastify/cors"

import { criarAluno } from "./routes/criar-aluno";
import { criarLivro } from "./routes/criar-livro";
import { criarColaborador } from "./routes/criar-colaborador"
import { criarEmprestimo } from "./routes/criar-emprestimo";
import { buscarLivros } from "./routes/buscar-livros";
import { buscarAlunos } from "./routes/buscar-alunos";
import { buscarEmprestimoAluno } from "./routes/buscar-emprestimo-aluno";
import { devolverEmprestimo } from "./routes/devolver-emprestimo";
import { errorHandler } from "./error-handler";

export const app = fastify() //instaciei o fastfy

app.register(fastifiCors, {
    origin: "*"
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
app.register(criarAluno, { prefix: '/biblioteca' })
app.register(criarLivro, { prefix: '/biblioteca' })
app.register(criarColaborador, { prefix: '/biblioteca' })
app.register(criarEmprestimo, { prefix: '/biblioteca' })
app.register(buscarLivros, { prefix: '/biblioteca' })
app.register(buscarAlunos, { prefix: '/biblioteca' })
app.register(buscarEmprestimoAluno, { prefix: '/biblioteca' })
app.register(devolverEmprestimo, { prefix: '/biblioteca' })

app.setErrorHandler(errorHandler)

app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
    console.log("SERVER RUNNING");
})


