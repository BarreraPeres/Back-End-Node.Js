/*
  Warnings:

  - The primary key for the `Livro` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `isbn` on the `Livro` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Livro` DROP PRIMARY KEY,
    MODIFY `isbn` INTEGER NOT NULL,
    ADD PRIMARY KEY (`isbn`);
