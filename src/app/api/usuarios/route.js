import {prisma} from "@/libs/prisma.js"
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"


export async function POST(request){

    try {
        const data = await request.formData()

        const nombre = data.get("nombre")
        const apellido = data.get("apellido")
        const email = data.get("email")
        const password =data.get("password")
        const hashPassword = await bcrypt.hash(password, 10)
        const repeatPassword = data.get("repeatPassword")


        const usuarioEncontrado = await prisma.usuarios.findUnique({
            where:{
                email
            }
        })

        if(usuarioEncontrado){
            return NextResponse.json({
                code: 400,
                message: "Ya existe un usuario registrado con ese Email"
            })
        }



        const nuevoUsuario = await prisma.usuarios.create({
            data: {
                nombre,
                apellido, 
                email,
                password: hashPassword
            }
        }) 

        const {password:_, ...usuario} = nuevoUsuario
        

        return NextResponse.json({
            code:200,
            data: usuario,
            message: "Usuario Crado Con Éxito"
        })

    } catch (error) {
        return NextResponse.json({
            code:500,
            message: "Hubo un problema con el servidor, no se pudo crear el usuario",
            error:error.message
        })
    }
}