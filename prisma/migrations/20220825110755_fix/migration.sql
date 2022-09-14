/*
  Warnings:

  - You are about to drop the `Arquivos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Arquivos` DROP FOREIGN KEY `Arquivos_idEmpreendimento_fkey`;

-- DropTable
DROP TABLE `Arquivos`;

-- CreateTable
CREATE TABLE `arquivos` (
    `id` VARCHAR(191) NOT NULL,
    `nomeArquivo` VARCHAR(191) NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `idEmpreendimento` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `arquivos` ADD CONSTRAINT `arquivos_idEmpreendimento_fkey` FOREIGN KEY (`idEmpreendimento`) REFERENCES `empreendimentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
