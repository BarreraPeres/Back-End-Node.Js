import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-XNXSUPUX.mjs";

// src/routes/devolver-emprestimo.ts
import z from "zod";
async function devolverEmprestimo(app) {
  app.withTypeProvider().put("/:emprestimoId/devolucao", {
    schema: {
      summary: "Devolve o empr\xE9stimo",
      tags: ["emprestimos"],
      params: z.object({
        emprestimoId: z.coerce.number().int()
      }),
      body: z.object({
        ra: z.number(),
        isbn: z.number().int()
      })
    }
  }, async (request, reply) => {
    const { emprestimoId } = request.params;
    const { ra, isbn } = request.body;
    const [emprestimo, aluno, livro] = await Promise.all([
      prisma.emprestimo.findUnique({
        where: {
          id: emprestimoId
        }
      }),
      prisma.aluno.findUnique({
        where: {
          ra
        }
      }),
      prisma.livro.findUnique({
        where: {
          isbn
        }
      })
    ]);
    if (!emprestimo) {
      throw new BadRequest("Empr\xE9stimo N\xE3o Encontrado!");
    }
    if (!aluno) {
      throw new BadRequest("Aluno N\xE3o Encontrado!");
    }
    if (!livro) {
      throw new BadRequest("Livro N\xE3o Encontrado!");
    }
    if (emprestimo.dataEmprestimo === null) {
      throw new BadRequest("Livro J\xE1 Devolvido!");
    }
    await prisma.emprestimo.delete({
      where: {
        id: emprestimoId
      }
    });
    await prisma.livro.update({
      where: {
        id: livro.id
      },
      data: {
        quantidade: livro.quantidade + 1
        // Atualizando a quantidade de livros disponíveis
      }
    });
    return reply.status(200).send({ message: "Livro devolvido com sucesso" });
  });
}

export {
  devolverEmprestimo
};
