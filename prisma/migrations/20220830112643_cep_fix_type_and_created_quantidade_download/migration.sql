/*
  Warnings:

  - You are about to alter the column `cep` on the `empreendimentos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.

*/
-- AlterTable
ALTER TABLE `arquivos` ADD COLUMN `quantidadeDownload` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `empreendimentos` MODIFY `cep` INTEGER NOT NULL;
