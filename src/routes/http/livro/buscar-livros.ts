import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../../config/prisma";

export async function buscarLivros(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get("/livros", {
      schema: {
        summary: "Busca todos livros",
        tags: ["livros"],
        description: "Busca livros paginados",
        querystring: z.object({
          query: z.string().nullish(),
          pageIndex: z.string().nullish().default("0").transform(Number),
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
        },
      },
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
            contains: query,
          }
        } : {},
        take: 10,
        skip: pageIndex * 10,
      });
      console.log(request.url)
      return reply.status(200).send({
        livros: livros.map(livros => {
          return {
            nome: livros.nome,
            isbn: livros.isbn,
            autor: livros.autor,
            paginas: livros.paginas,
            quantidade: livros.quantidade,
            quantidadeEmprestadas: livros._count.Emprestimo
          }
        })
      });
    });
}
