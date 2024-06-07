/*
  Warnings:

  - The primary key for the `Aluno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `ra` on the `Aluno` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Aluno` DROP PRIMARY KEY,
    MODIFY `ra` INTEGER NOT NULL,
    ADD PRIMARY KEY (`ra`);
