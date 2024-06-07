import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-XNXSUPUX.mjs";

// src/routes/buscar-emprestimo-aluno.ts
import z from "zod";
async function buscarEmprestimoAluno(app) {
  app.withTypeProvider().get("/:alunoRa/emprestimo", {
    schema: {
      summary: "Busca um emprestimo",
      tags: ["emprestimos"],
      params: z.object({
        alunoRa: z.coerce.number().int()
      }),
      response: {
        200: z.object({
          emprestimos: z.array(z.object({
            nomeAluno: z.string(),
            emprestimoId: z.number().int(),
            dataEmprestimo: z.date(),
            dataDevolu\u00E7\u00E3o: z.date().nullable(),
            isbn: z.number().int(),
            nome: z.string(),
            autor: z.string()
          }))
        })
      }
    }
  }, async (request, reply) => {
    const { alunoRa } = request.params;
    const busca = await prisma.aluno.findUnique({
      select: {
        nome: true,
        Emprestimo: {
          select: {
            livro: { select: { isbn: true, nome: true, autor: true } },
            id: true,
            dataEmprestimo: true,
            dataDevolucao: true
          }
        }
      },
      where: {
        ra: alunoRa
      }
    });
    if (busca === null) {
      throw new BadRequest("Nenhum Emprestimo a esse aluno");
    }
    return reply.send({
      emprestimos: busca.Emprestimo.map((emprestimos) => {
        return {
          nomeAluno: busca.nome,
          emprestimoId: emprestimos.id,
          dataEmprestimo: emprestimos.dataEmprestimo,
          dataDevolu\u00E7\u00E3o: emprestimos.dataDevolucao,
          isbn: emprestimos.livro.isbn,
          nome: emprestimos.livro.nome,
          autor: emprestimos.livro.autor
        };
      })
    });
  });
}

export {
  buscarEmprestimoAluno
};
