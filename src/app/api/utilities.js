import { NextResponse } from "next/server";
import { unlink, writeFile, rename } from "fs/promises";
import path from "path";

export const eliminarArchivo = async (rutaArchivo) =>{
    try {
        await unlink(rutaArchivo);
    } catch (error) {
        return NextResponse.json({
            code: 400,
            message: "hubo un problema",
        });
    }
}

export const renombrarArchivo = async(rutaArchivo, filePath) =>{
    try {
        await rename(rutaArchivo, filePath);
    } catch (error) {
        return NextResponse.json({
            code: 400,
            message: "hubo un problema",
        });
    }
}

export const guardarArchivo = async(imagen, nombre, extension) =>{
    try {
        const bytes = await imagen.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(
            process.cwd(),
            "public",
            `${nombre}.${extension}`
        );
        writeFile(filePath, buffer);
    } catch (error) {
        return NextResponse.json({
            code: 400,
            message: "hubo un problema",
        });
    }
}

export const formatoValido = (extension) =>{
    try {
        const formatosValidos = ["jpg", "jpeg", "png", "webp"];
        if (!formatosValidos.includes(extension)) {
            return NextResponse.json({
                code: 400,
                message: `El formato de una o ás imágenes no es válido, solo se aceptan los siguientes formatos [${formatosValidos}]`,
            });
        }
    } catch (error) {
        return NextResponse.json({
            code: 400,
            message: "hubo un problema",
        });
    }
}