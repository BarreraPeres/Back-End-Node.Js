import {
  criarEmprestimo
} from "./chunk-ISJZIOP3.mjs";
import {
  criarLivro
} from "./chunk-YQBHOMFA.mjs";
import {
  devolverEmprestimo
} from "./chunk-OYGLSKLH.mjs";
import "./chunk-T7SVTGKZ.mjs";
import {
  errorHandler
} from "./chunk-RIUN3PHQ.mjs";
import {
  buscarAlunos
} from "./chunk-75B7MECL.mjs";
import {
  buscarEmprestimoAluno
} from "./chunk-KGPCXU4Z.mjs";
import "./chunk-JRO4E4TH.mjs";
import {
  buscarLivros
} from "./chunk-NGKO5HFI.mjs";
import {
  criarAluno
} from "./chunk-IRGG3PRU.mjs";
import "./chunk-IAV4HBFG.mjs";
import "./chunk-WPGABOIR.mjs";
import {
  criarColaborador
} from "./chunk-GDHQXSYQ.mjs";
import "./chunk-XNXSUPUX.mjs";

// src/server.ts
import fastify from "fastify";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
var app = fastify();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["aplication/json"],
    info: {
      title: "API-Back-End",
      description: "Back-End para gerenciar empr\xE9stimos de livros para os alunos em uma universidade",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.register(criarAluno, { prefix: "/biblioteca" });
app.register(criarLivro, { prefix: "/biblioteca" });
app.register(criarColaborador, { prefix: "/biblioteca" });
app.register(criarEmprestimo, { prefix: "/biblioteca" });
app.register(buscarLivros, { prefix: "/biblioteca" });
app.register(buscarAlunos, { prefix: "/biblioteca" });
app.register(buscarEmprestimoAluno, { prefix: "/biblioteca" });
app.register(devolverEmprestimo, { prefix: "/biblioteca" });
app.setErrorHandler(errorHandler);
app.listen({ port: 3333 }).then(() => {
  console.log("SERVER RUNNING");
});
export {
  app
};
