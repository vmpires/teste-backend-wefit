/*
  Warnings:

  - You are about to alter the column `numeroDocumento` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Usuario` MODIFY `numeroDocumento` INTEGER NOT NULL;
