/*
  Warnings:

  - You are about to drop the column `url` on the `qrcode` table. All the data in the column will be lost.
  - Added the required column `url_dynamic` to the `qrcode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url_fixed` to the `qrcode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `view_count` to the `qrcode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `qrcode` DROP COLUMN `url`,
    ADD COLUMN `url_dynamic` VARCHAR(191) NOT NULL,
    ADD COLUMN `url_fixed` VARCHAR(191) NOT NULL,
    ADD COLUMN `view_count` INTEGER NOT NULL;
