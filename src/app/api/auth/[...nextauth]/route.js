import NextAuth from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import {prisma} from "@/libs/prisma.js"
import bcrypt from "bcrypt"




export const authOptions = {
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials:{
                email: { label: "Email", type:"text", placeholder :"jsmith"},
                password: {label: "Password", type :"password", placeholder :"******"},
            },

            async authorize(credentials, req){
                const userFind = await prisma.usuarios.findUnique({
                    where: {
                        email: credentials.email
                    }
                })


                if (!userFind){
                    throw new Error("No existe usuario con ese Email")
                }
                


                const matchPassword = await bcrypt.compare(credentials.password, userFind.password)

                if(!matchPassword){
                    throw new Error("La contraseña es incorrecta")
                }

                const user = { id: toString(userFind.id), name: userFind.nombre, email: userFind.email}



                return user

            }
        })
    ],
    pages:{
        signIn: "/auth/login",
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}