-- CreateTable
CREATE TABLE "Personajes" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Personajes_pkey" PRIMARY KEY ("id")
);
