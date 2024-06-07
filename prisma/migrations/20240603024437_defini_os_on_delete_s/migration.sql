-- DropForeignKey
ALTER TABLE `Emprestimo` DROP FOREIGN KEY `Emprestimo_alunoId_fkey`;

-- DropForeignKey
ALTER TABLE `Emprestimo` DROP FOREIGN KEY `Emprestimo_livroId_fkey`;

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `Aluno`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emprestimo` ADD CONSTRAINT `Emprestimo_livroId_fkey` FOREIGN KEY (`livroId`) REFERENCES `Livro`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
