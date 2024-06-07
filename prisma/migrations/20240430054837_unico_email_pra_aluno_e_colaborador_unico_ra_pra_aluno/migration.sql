/*
  Warnings:

  - A unique constraint covering the columns `[ra]` on the table `Aluno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Aluno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Colaborador` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Aluno` MODIFY `telefone` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Aluno_ra_key` ON `Aluno`(`ra`);

-- CreateIndex
CREATE UNIQUE INDEX `Aluno_email_key` ON `Aluno`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Colaborador_email_key` ON `Colaborador`(`email`);
