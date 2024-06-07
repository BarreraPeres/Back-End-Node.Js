import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-XNXSUPUX.mjs";

// src/routes/criar-livro.ts
import { number, z } from "zod";
async function criarLivro(app) {
  app.withTypeProvider().post("/livros", {
    schema: {
      summary: "Cria um livro",
      tags: ["livros"],
      body: z.object({
        isbn: z.number().int(),
        nome: z.string().min(4),
        autor: z.string().min(4),
        paginas: z.number().int(),
        quantidade: z.number().int().positive()
      }),
      response: {
        201: z.object({
          livroId: number().int()
        })
      }
    }
  }, async (request, reply) => {
    const { isbn, nome, autor, paginas, quantidade } = request.body;
    const livroExistente = await prisma.livro.findUnique({
      where: {
        isbn
      }
    });
    if (livroExistente !== null) {
      throw new BadRequest("Livro com este ISBN j\xE1 cadastrado!");
    }
    const livro = await prisma.livro.create({
      data: {
        isbn,
        nome,
        autor,
        paginas,
        quantidade
      }
    });
    return reply.status(201).send({ livroId: livro.id });
  });
}

export {
  criarLivro
};
