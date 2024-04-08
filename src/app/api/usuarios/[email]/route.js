import {prisma} from "@/libs/prisma.js"
import { NextResponse } from "next/server";

export async function GET(request, { params }){
    let email = params.email

    try {
        const userFind = await prisma.usuarios.findUnique({
            where: {
                email
            }
        })
        return NextResponse.json({
        code:200,
        message: "Usuario Encontrado",
        data: userFind
    })
    } catch (error) {
        return NextResponse.json({
            code:500,
            message: "Hubo un problema con el servidor",
        })
    }

}