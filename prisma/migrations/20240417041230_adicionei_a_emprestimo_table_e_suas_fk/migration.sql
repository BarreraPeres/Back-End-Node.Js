/*
  Warnings:

  - The primary key for the `Colaborador` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `cpf` on the `Colaborador` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Colaborador` DROP PRIMARY KEY,
    MODIFY `cpf` INTEGER NOT NULL,
    ADD PRIMARY KEY (`cpf`);

-- CreateTable
CREATE TABLE `Emprestimo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataEmprestimo` DATETIME(3) NOT NULL,
    `dataDevolucao` DATETIME(3) NOT NULL,
    `alunoRa` INTEGER NOT NULL,
    `livroIsbn` INTEGER NOT NULL,
    `colaboradorCpf` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_alunoRa_fkey` FOREIGN KEY (`alunoRa`) REFERENCES `Aluno`(`ra`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_livroIsbn_fkey` FOREIGN KEY (`livroIsbn`) REFERENCES `Livro`(`isbn`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_colaboradorCpf_fkey` FOREIGN KEY (`colaboradorCpf`) REFERENCES `Colaborador`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;
