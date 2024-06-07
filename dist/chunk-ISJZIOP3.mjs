import {
  calcularDataDevolucaoPadrao
} from "./chunk-T7SVTGKZ.mjs";
import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-XNXSUPUX.mjs";

// src/routes/criar-emprestimo.ts
import { z } from "zod";
async function criarEmprestimo(app) {
  app.withTypeProvider().post("/:isbn/emprestimo", {
    schema: {
      summary: "Cria o empr\xE9stimo",
      tags: ["emprestimos"],
      body: z.object({
        dataDevolucao: z.string().datetime().nullable(),
        ra: z.number().int(),
        cpf: z.number().int()
      }),
      params: z.object({
        isbn: z.coerce.number().int()
        // transformando o livroId pra string pois o parms so recebe string
      }),
      response: {
        201: z.object({
          emprestimoId: z.number().int()
        })
      }
    }
  }, async (request, reply) => {
    const { ra, cpf, dataDevolucao } = request.body;
    const { isbn } = request.params;
    const [aluno, colaborador, livro] = await Promise.all([
      prisma.aluno.findUnique({
        where: {
          ra
        }
        //achando o ra do aluno pra passar pelo body
      }),
      prisma.colaborador.findUnique({
        where: {
          cpf
        }
      }),
      prisma.livro.findUnique({
        where: {
          isbn
        }
      })
    ]);
    if (!aluno) {
      throw new BadRequest("Aluno N\xE3o Encontrado!");
    }
    if (!colaborador) {
      throw new BadRequest("Colaborador N\xE3o Encontrado!");
    }
    if (!livro) {
      throw new BadRequest("Livro N\xE3o Encontrado");
    }
    if (livro.quantidade <= 0) {
      throw new BadRequest("Livro N\xE3o Dispon\xEDvel No Momento");
    }
    const dataDevolucaoPadrao = dataDevolucao ?? calcularDataDevolucaoPadrao();
    const emprestimo = await prisma.emprestimo.create({
      data: {
        dataDevolucao: dataDevolucaoPadrao,
        alunoId: aluno.id,
        colaboradorId: colaborador.id,
        livroId: livro.id
      }
    });
    await prisma.livro.update({
      where: {
        isbn
      },
      data: {
        quantidade: livro.quantidade - 1
      }
    });
    return reply.status(201).send({ emprestimoId: emprestimo.id });
  });
}

export {
  criarEmprestimo
};
