-- CreateTable
CREATE TABLE `Livro` (
    `isbn` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `autor` VARCHAR(191) NOT NULL,
    `paginas` INTEGER NOT NULL,

    PRIMARY KEY (`isbn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
