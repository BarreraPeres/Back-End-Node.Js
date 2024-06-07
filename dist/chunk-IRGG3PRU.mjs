import {
  geradorEmail
} from "./chunk-IAV4HBFG.mjs";
import {
  geradorRa
} from "./chunk-WPGABOIR.mjs";
import {
  prisma
} from "./chunk-XNXSUPUX.mjs";

// src/routes/criar-aluno.ts
import { number, z } from "zod";
async function criarAluno(app) {
  app.withTypeProvider().post("/aluno", {
    schema: {
      summary: "Cria um aluno",
      tags: ["alunos"],
      body: z.object({
        nome: z.string().min(4),
        telefone: z.string().optional()
      }),
      response: {
        201: z.object({
          alunoRa: number().int()
        })
      }
    }
  }, async (request, reply) => {
    const { nome, telefone } = request.body;
    const alunoRa = geradorRa();
    const alunoEmail = geradorEmail(nome, alunoRa);
    const alunos = await prisma.aluno.create({
      data: {
        nome,
        telefone,
        ra: alunoRa,
        //gerado por função
        email: alunoEmail
        // gerado por funçao
      }
    });
    return reply.status(201).send({ alunoRa: alunos.ra });
  });
}

export {
  criarAluno
};
