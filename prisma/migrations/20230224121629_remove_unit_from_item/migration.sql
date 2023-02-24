/*
  Warnings:

  - You are about to drop the column `unitId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_unitId_fkey`;

-- AlterTable
ALTER TABLE `Item` DROP COLUMN `unitId`;
