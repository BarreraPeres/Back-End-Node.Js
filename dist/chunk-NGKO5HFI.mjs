import {
  prisma
} from "./chunk-XNXSUPUX.mjs";

// src/routes/buscar-livros.ts
import { z } from "zod";
async function buscarLivros(app) {
  app.withTypeProvider().get("/livros", {
    schema: {
      summary: "Busca todos livros",
      tags: ["livros"],
      querystring: z.object({
        query: z.string().nullish(),
        pageIndex: z.string().nullish().default("0").transform(Number)
      }),
      response: {
        200: z.object({
          livros: z.array(z.object({
            nome: z.string(),
            isbn: z.number(),
            autor: z.string(),
            paginas: z.number().int(),
            quantidade: z.number().int(),
            quantidadeEmprestadas: z.number().int()
          }))
        })
      }
    }
  }, async (request, reply) => {
    const { pageIndex, query } = request.query;
    const livros = await prisma.livro.findMany({
      select: {
        nome: true,
        isbn: true,
        autor: true,
        paginas: true,
        quantidade: true,
        _count: { select: { Emprestimo: true } }
      },
      where: query ? {
        nome: {
          contains: query
        }
      } : {},
      take: 10,
      skip: pageIndex * 10
    });
    console.log(request.url);
    return reply.status(200).send({
      livros: livros.map((livros2) => {
        return {
          nome: livros2.nome,
          isbn: livros2.isbn,
          autor: livros2.autor,
          paginas: livros2.paginas,
          quantidade: livros2.quantidade,
          quantidadeEmprestadas: livros2._count.Emprestimo
        };
      })
    });
  });
}

export {
  buscarLivros
};
