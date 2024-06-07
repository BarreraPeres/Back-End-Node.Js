import { prisma } from "../src/config/prisma";

async function seed() {
  await prisma.aluno.create({
    data: {
      id: 95,
      ra: 111111,
      nome: "Joseph Bell",
      telefone: "11111",
      email: "JosephBell@universidade.com.br",
    },
  })

  await prisma.colaborador.create({
    data: {
      id: 95,
      nome: "Jonh Doe",
      cargo: "Bibliotecário",
      cpf: 111111,
      email: "JonhDoe@universidade.com.br",
    }
  })

  await prisma.livro.create({
    data: {
      id: 95,
      autor: "Ryan Dahl",
      isbn: 11111,
      nome: "runtime Deno",
      paginas: 11111,
      quantidade: 11
    }
  })

  await prisma.emprestimo.createMany({
    data: [
      {
        alunoId: 95,
        livroId: 95,
        colaboradorId: 95,
        dataDevolucao: new Date('2024-06-10')
      },

      {
        alunoId: 95,
        livroId: 95,
        colaboradorId: 95,
        dataDevolucao: new Date('2024-06-10')
      }
    ]
  })
}


seed().then(() => {
  console.log("SEED DATABASE CRIADO!")
})