-- DropForeignKey
ALTER TABLE `qrcode` DROP FOREIGN KEY `qrcode_idEmpreendimento_fkey`;

-- AddForeignKey
ALTER TABLE `qrcode` ADD CONSTRAINT `qrcode_idEmpreendimento_fkey` FOREIGN KEY (`idEmpreendimento`) REFERENCES `empreendimentos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
