/*
  Warnings:

  - You are about to drop the column `url_dynamic` on the `qrcode` table. All the data in the column will be lost.
  - You are about to drop the column `url_fixed` on the `qrcode` table. All the data in the column will be lost.
  - Added the required column `url` to the `qrcode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `qrcode` DROP COLUMN `url_dynamic`,
    DROP COLUMN `url_fixed`,
    ADD COLUMN `url` VARCHAR(191) NOT NULL;
