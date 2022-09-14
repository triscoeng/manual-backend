/*
  Warnings:

  - You are about to drop the `Usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Usuarios`;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `usuario` VARCHAR(191) NOT NULL,
    `nomeUsuario` VARCHAR(191) NOT NULL,
    `senhaUsuario` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `usuarios_usuario_key`(`usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `construtoras` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `nomeContato` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefone` DECIMAL(65, 30) NOT NULL,

    UNIQUE INDEX `construtoras_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empreendimentos` (
    `id` VARCHAR(191) NOT NULL,
    `nomeEmpreendimento` VARCHAR(191) NOT NULL,
    `cep` DECIMAL(65, 30) NOT NULL,
    `idConstrutora` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Arquivos` (
    `id` VARCHAR(191) NOT NULL,
    `nomeArquivo` VARCHAR(191) NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `idEmpreendimento` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `empreendimentos` ADD CONSTRAINT `empreendimentos_idConstrutora_fkey` FOREIGN KEY (`idConstrutora`) REFERENCES `construtoras`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Arquivos` ADD CONSTRAINT `Arquivos_idEmpreendimento_fkey` FOREIGN KEY (`idEmpreendimento`) REFERENCES `empreendimentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
