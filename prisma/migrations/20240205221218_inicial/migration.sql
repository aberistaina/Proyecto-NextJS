/*
  Warnings:

  - Added the required column `apellido` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuarios" ADD COLUMN     "apellido" TEXT NOT NULL;
