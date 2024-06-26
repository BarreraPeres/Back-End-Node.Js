/*
  Warnings:

  - Added the required column `senha_hash` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha_hash` to the `Colaborador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Aluno` ADD COLUMN `senha_hash` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Colaborador` ADD COLUMN `senha_hash` VARCHAR(191) NOT NULL;
