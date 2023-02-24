/*
  Warnings:

  - A unique constraint covering the columns `[unitId]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Item` ADD COLUMN `amount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `unitId` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Unit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Item_unitId_key` ON `Item`(`unitId`);

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Unit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
