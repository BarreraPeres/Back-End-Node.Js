/*
  Warnings:

  - Added the required column `quantidade` to the `Livro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Emprestimo` MODIFY `dataDevolucao` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Livro` ADD COLUMN `quantidade` INTEGER NOT NULL;
