-- CreateTable
CREATE TABLE `qrcode` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `idEmpreendimento` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `qrcode` ADD CONSTRAINT `qrcode_idEmpreendimento_fkey` FOREIGN KEY (`idEmpreendimento`) REFERENCES `empreendimentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
