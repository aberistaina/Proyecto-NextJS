"use client"

import Link from "next/link";
import Image from "next/image";
import { useState } from "react"
import { showSuccessAlert, showErrorAlert } from "@/app/components/Alertas";
import { useRouter } from "next/navigation"

import { signIn } from "next-auth/react";

export default function FormularioLogin() {

const svg1 =<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mt-2 ms-2 cursor-pointer" onClick={(e) =>{setEyeIcon(!eyeIcon)}}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>

const svg2 = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mt-2 ms-2 cursor-pointer" onClick={(e) =>{setEyeIcon(!eyeIcon)}}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>

const [eyeIcon, setEyeIcon] = useState(false)
const [error, setError] = useState(null)


const router = useRouter()

const [formUsuario, setFormUsuario] = useState({   
    email: "", 
    password: "",

});

const handleChange = (e) => {
    const { name, value } = e.target;
        setFormUsuario({
            ...formUsuario,
            [name]: value,
        });
    
};

const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await signIn("credentials", {
        email: formUsuario.email,
        password: formUsuario.password,
        redirect: false
    })
    if(res.error){
        setError(res.error)

    }else{
        router.push("/") 
        showSuccessAlert("Login Exitoso 😁")
    }
    
}



    return (
        <div className="flex justify-center items-center h-[45rem] mb-10 ">
            <form className=" text-xl rounded-xl flex-col flex  p-4 justify-center  bg-transparent w-96 h-96" onSubmit={handleSubmit}>
                <h1 className="text-center my-5 text-5xl text-sky-500">
                    Login
                </h1>
                <Image
                    className="bg-transparent block mx-auto py-6"
                    src="/cartman.gif"
                    alt="Logo"
                    width={150}
                    height={150}
                />

                <p className="bg-red-600 text-white text-base rounded text-center w-80 mb-2">{error}</p>
                <div className="w-80">
                <label className="dark:text-white" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-md w-full border-solid border-4 border-indigo-600 mb-4"
                    type="email"
                    name="email"
                    id=""
                    onChange={handleChange}
                />
                </div>


                <div className="flex justify-center items-center">
                    <div className="w-80">
                        <label className="dark:text-white" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                            className="rounded-md w-full border-solid border-4 border-indigo-600 mb-4"
                            type={`${eyeIcon == true ? "text" : "password"}`}
                            name="password"
                            id=""
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        { eyeIcon == false ? svg1 : svg2}
                    </div>
                </div>

                <div className="flex justify-center w-80">
                    <button
                        className="rounded-md px-2 py-2 mt-5 w-[10rem] 
                    text-white
                    bg-gradient-to-r from-sky-500 to-indigo-500
                    transition-all hover:from-violet-500 hover:to-fuchsia-500

                    "
                        type="submit"
                    >
                        Enviar
                    </button>
                </div>
                <span className="text-sm text-slate-400 text-center w-80 pt-4">¿No tienes una cuenta? <Link href="/auth/register"><b>Regístrate acá</b></Link></span>
            </form>
        </div>
    );
}
