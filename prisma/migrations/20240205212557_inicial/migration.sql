/*
  Warnings:

  - You are about to drop the column `imagen` on the `Personajes` table. All the data in the column will be lost.
  - Added the required column `imagen1` to the `Personajes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagen2` to the `Personajes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Personajes" DROP COLUMN "imagen",
ADD COLUMN     "imagen1" TEXT NOT NULL,
ADD COLUMN     "imagen2" TEXT NOT NULL;
