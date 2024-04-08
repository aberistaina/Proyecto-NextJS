import {prisma} from "@/libs/prisma.js"
import { NextResponse } from "next/server";
import {writeFile} from "fs/promises"
import path from "path";


export async function GET(){

    try {
        const resultado = await prisma.personajes.findMany({
            orderBy:{
                id: "asc"
            }
        })
        return NextResponse.json({
        code:200,
        message: "Personajes Encontrados",
        data: resultado
    })
    } catch (error) {
        return NextResponse.json({
            code:500,
            message: "Hubo un problema con el servidor",
        })
    }

}

export async function POST(request){

    try {
        const data = await request.formData()

        const nombre = data.get("nombre")
        const edad = data.get("edad")
        const genero = data.get("genero")
        const imagen1 = data.get("imagen1")
        const imagen2 = data.get("imagen2")

        

        const extension1 = imagen1.name.split(".").pop()
        const extension2 = imagen2.name.split(".").pop()

        const personajesActuales = await prisma.personajes.findFirst({
            where:{
                nombre : nombre
            }
        })

        const formatosValidos = ["jpg", "jpeg", "png", "webp"]

        if (!formatosValidos.includes(extension1) || !formatosValidos.includes(extension2)) {
            return NextResponse.json({
                code:400,
                message: `El formato de una o ás imágenes no es válido, solo se aceptan los siguientes formatos [${formatosValidos}]`
            })

        }


        if(personajesActuales){
            return NextResponse.json({
                code:400,
                message: `El personaje ${personajesActuales.nombre} ya se encuentra en la base de datos`
            })
        }
        

        const nuevoPersonaje = await prisma.personajes.create({
            data: {
                nombre,
                edad: Number(edad),
                genero,
                imagen1: `/${nombre}.${extension1}`,
                imagen2: `/${nombre}2.${extension2}`
            }
        }) 
        

        const bytes1 = await imagen1.arrayBuffer()
        const buffer1 = Buffer.from(bytes1)
        const filePath1 = path.join(process.cwd(), "public",`${nombre}.${extension1}`)
        writeFile(filePath1, buffer1)

        const bytes2 = await imagen2.arrayBuffer()
        const buffer2 = Buffer.from(bytes2)
        const filePath2 = path.join(process.cwd(), "public",`${nombre}2.${extension2}`)
        writeFile(filePath2, buffer2)

        return NextResponse.json({
            code:200,
            data: nuevoPersonaje,
            message: "Personaje Crado Con Éxito"
        })

    } catch (error) {
        return NextResponse.json({
            code:500,
            message: "Hubo un problema con el servidor, no se pudo crear el personaje",
            error:error.message
        })
    }
}