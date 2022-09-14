-- DropForeignKey
ALTER TABLE `arquivos` DROP FOREIGN KEY `arquivos_idEmpreendimento_fkey`;

-- DropForeignKey
ALTER TABLE `empreendimentos` DROP FOREIGN KEY `empreendimentos_idConstrutora_fkey`;

-- AddForeignKey
ALTER TABLE `empreendimentos` ADD CONSTRAINT `empreendimentos_idConstrutora_fkey` FOREIGN KEY (`idConstrutora`) REFERENCES `construtoras`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `arquivos` ADD CONSTRAINT `arquivos_idEmpreendimento_fkey` FOREIGN KEY (`idEmpreendimento`) REFERENCES `empreendimentos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
