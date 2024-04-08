/*
  Warnings:

  - Added the required column `imagen` to the `Personajes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Personajes" ADD COLUMN     "imagen" TEXT NOT NULL;
