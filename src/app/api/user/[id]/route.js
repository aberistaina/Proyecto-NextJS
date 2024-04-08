import { prisma } from "@/libs/prisma.js";
import { NextResponse } from "next/server";
import { unlink, writeFile, rename } from "fs/promises";
import path from "path";



export async function GET(request, { params }) {
    try {
        const resultado = await prisma.personajes.findUnique({
            where: {
                id: Number(params.id),
            },
        });
        return NextResponse.json({
            code: 200,
            message: "Personajes Encontrado",
            data: resultado,
        });
    } catch (error) {
        return NextResponse.json({
            code: 500,
            message: "Hubo un problema al mostrar la información",
            error: error.message,
        });
    }
}

export async function DELETE(request, { params }) {
    

    try {
        const personaje = await prisma.personajes.findUnique({
            where: {
                id: Number(params.id),
            },
        });

        const rutaArchivo1 = path.join(
            process.cwd(),
            "public",
            personaje.imagen1
        );
        const rutaArchivo2 = path.join(
            process.cwd(),
            "public",
            personaje.imagen2
        );

        await unlink(rutaArchivo1);
        await unlink(rutaArchivo2);

        const resultado = await prisma.personajes.delete({
            where: {
                id: Number(params.id),
            },
        });
        return NextResponse.json({
            code: 200,
            message: "Personajes Eliminado",
            /* data: resultado */
        });
    } catch (error) {
        return NextResponse.json({
            code: 500,
            message: "Hubo un problema al eliminar el personaje",
            error: error.message,
        });
    }
}


export async function PUT(request, { params }) {
    try {
        const personaje = await prisma.personajes.findUnique({
            where: {
                id: Number(params.id),
            },
        });

        const data = await request.formData();
        const nombre = data.get("nombre");
        const edad = data.get("edad");
        const genero = data.get("genero");
        const imagen1 = data.get("imagen1");
        const imagen2 = data.get("imagen2");
        const rutaArchivo1 = path.join(
            process.cwd(),
            "public",
            personaje.imagen1
        );
        const rutaArchivo2 = path.join(
            process.cwd(),
            "public",
            personaje.imagen2
        );
        const formatosValidos = ["jpg", "jpeg", "png", "webp"];
        let resultado = "";

        if (imagen1.name != undefined && imagen2.name != undefined) {
            const extension1 = imagen1.name.split(".").pop();
            const extension2 = imagen2.name.split(".").pop();

            if (!formatosValidos.includes(extension1)) {
                return NextResponse.json({
                    code: 400,
                    message: `El formato de una o ás imágenes no es válido, solo se aceptan los siguientes formatos [${formatosValidos}]`,
                });
            }

            await unlink(rutaArchivo1);
            await unlink(rutaArchivo2);

            const bytes1 = await imagen1.arrayBuffer();
            const buffer1 = Buffer.from(bytes1);
            const filePath1 = path.join(
                process.cwd(),
                "public",
                `${nombre}.${extension1}`
            );

            const bytes2 = await imagen2.arrayBuffer();
            const buffer2 = Buffer.from(bytes2);
            const filePath2 = path.join(
                process.cwd(),
                "public",
                `${nombre}2.${extension2}`
            );

            writeFile(filePath1, buffer1);
            writeFile(filePath2, buffer2);

            await prisma.personajes.update({
                where: {
                    id: Number(params.id),
                },
                data: {
                    nombre,
                    edad: Number(edad),
                    genero,
                    imagen1: `/${nombre}.${extension1}`,
                    imagen2: `/${nombre}2.${extension2}`
                },
            });

        } else if (imagen1.name != undefined && imagen2.name == undefined) {
            const extension1 = imagen1.name.split(".").pop();

            if (!formatosValidos.includes(extension1)) {
                return NextResponse.json({
                    code: 400,
                    message: `El formato de una o ás imágenes no es válido, solo se aceptan los siguientes formatos [${formatosValidos}]`,
                });
            }
            await unlink(rutaArchivo1);
            const bytes1 = await imagen1.arrayBuffer();
            const buffer1 = Buffer.from(bytes1);
            const filePath1 = path.join(
                process.cwd(),
                "public",
                `${nombre}.${extension1}`
            );
            writeFile(filePath1, buffer1);
            if (personaje.nombre != nombre) {
                const extension2 = personaje.imagen2.split(".").pop();
                const filePath2 = path.join(
                    process.cwd(),
                    "public",
                    `${nombre}2.${extension2}`
                );
                await rename(rutaArchivo2, filePath2);
                await prisma.personajes.update({
                    where: {
                        id: Number(params.id),
                    },
                    data: {
                        nombre,
                        edad: Number(edad),
                        genero,
                        imagen1: `/${nombre}.${extension1}`,
                        imagen2: `/${nombre}2.${extension2}`,
                    },
                });
            } else {
                await prisma.personajes.update({
                    where: {
                        id: Number(params.id),
                    },
                    data: {
                        nombre,
                        edad: Number(edad),
                        genero,
                        imagen1: `/${nombre}.${extension1}`,
                    },
                });
            }
        } else if (imagen2.name != undefined && imagen1.name == undefined) {
            const extension2 = imagen2.name.split(".").pop();
            if (!formatosValidos.includes(extension2)) {
                return NextResponse.json({
                    code: 400,
                    message: `El formato de una o ás imágenes no es válido, solo se aceptan los siguientes formatos [${formatosValidos}]`,
                });
            }

            await unlink(rutaArchivo2);
            const bytes2 = await imagen2.arrayBuffer();
            const buffer2 = Buffer.from(bytes2);
            const filePath2 = path.join(
                process.cwd(),
                "public",
                `${nombre}2.${extension2}`
            );
            writeFile(filePath2, buffer2);

            if (personaje.nombre != nombre) {
                const extension1 = personaje.imagen1.split(".").pop();
                const filePath1 = path.join(
                    process.cwd(),
                    "public",
                    `${nombre}.${extension1}`
                );
                await rename(rutaArchivo1, filePath1);
                await prisma.personajes.update({
                    where: {
                        id: Number(params.id),
                    },
                    data: {
                        nombre,
                        edad: Number(edad),
                        genero,
                        imagen1: `/${nombre}.${extension1}`,
                        imagen2: `/${nombre}2.${extension2}`,
                    },
                });
            } else {
                await prisma.personajes.update({
                    where: {
                        id: Number(params.id),
                    },
                    data: {
                        nombre,
                        edad: Number(edad),
                        genero,
                        imagen2: `/${nombre}2.${extension2}`,
                    },
                });
            }
        } else {
            if (
                personaje.nombre != nombre &&
                imagen1.name == undefined &&
                imagen2.name == undefined
            ) {
                const extension1 = personaje.imagen1.split(".").pop();
                const extension2 = personaje.imagen1.split(".").pop();
                const filePath1 = path.join(
                    process.cwd(),
                    "public",
                    `${nombre}.${extension1}`
                );
                const filePath2 = path.join(
                    process.cwd(),
                    "public",
                    `${nombre}2.${extension2}`
                );
                await rename(rutaArchivo1, filePath1);
                await rename(rutaArchivo2, filePath2);
                await prisma.personajes.update({
                    where: {
                        id: Number(params.id),
                    },
                    data: {
                        nombre,
                        edad: Number(edad),
                        genero,
                        imagen1: `/${nombre}.${extension1}`,
                        imagen2: `/${nombre}2.${extension2}`,
                    },
                });
            } else {
                await prisma.personajes.update({
                    where: {
                        id: Number(params.id),
                    },
                    data: {
                        nombre,
                        edad: Number(edad),
                        genero,
                        imagen2: personaje.imagen2,
                    },
                });
            }
        }

        return NextResponse.json({
            code: 200,
            message: "Personaje Modificado con éxito",
            data: resultado,
        });
    } catch (error) {
        return NextResponse.json({
            code: 500,
            message: "No se pudo modificar el personaje",
            error: error.message,
        });
    }
}
