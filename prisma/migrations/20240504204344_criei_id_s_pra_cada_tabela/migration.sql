/*
  Warnings:

  - The primary key for the `Aluno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Colaborador` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `alunoRa` on the `Emprestimo` table. All the data in the column will be lost.
  - You are about to drop the column `colaboradorCpf` on the `Emprestimo` table. All the data in the column will be lost.
  - You are about to drop the column `livroIsbn` on the `Emprestimo` table. All the data in the column will be lost.
  - The primary key for the `Livro` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[cpf]` on the table `Colaborador` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[isbn]` on the table `Livro` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Colaborador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alunoId` to the `Emprestimo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colaboradorId` to the `Emprestimo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `livroId` to the `Emprestimo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Livro` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Emprestimo` DROP FOREIGN KEY `Emprestimo_alunoRa_fkey`;

-- DropForeignKey
ALTER TABLE `Emprestimo` DROP FOREIGN KEY `Emprestimo_colaboradorCpf_fkey`;

-- DropForeignKey
ALTER TABLE `Emprestimo` DROP FOREIGN KEY `Emprestimo_livroIsbn_fkey`;

-- AlterTable
ALTER TABLE `Aluno` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Colaborador` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Emprestimo` DROP COLUMN `alunoRa`,
    DROP COLUMN `colaboradorCpf`,
    DROP COLUMN `livroIsbn`,
    ADD COLUMN `alunoId` INTEGER NOT NULL,
    ADD COLUMN `colaboradorId` INTEGER NOT NULL,
    ADD COLUMN `livroId` INTEGER NOT NULL,
    MODIFY `dataEmprestimo` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Livro` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Colaborador_cpf_key` ON `Colaborador`(`cpf`);

-- CreateIndex
CREATE UNIQUE INDEX `Livro_isbn_key` ON `Livro`(`isbn`);

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `Aluno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_livroId_fkey` FOREIGN KEY (`livroId`) REFERENCES `Livro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_colaboradorId_fkey` FOREIGN KEY (`colaboradorId`) REFERENCES `Colaborador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
