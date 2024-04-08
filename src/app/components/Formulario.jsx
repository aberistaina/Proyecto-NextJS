"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { showSuccessAlert, showErrorAlert } from "@/app/components/Alertas";
import { useRouter } from 'next/navigation';


export default function FormPersonaje() {
    const { id } = useParams();

    const [file1, setFile1] = useState();
    const [file2, setFile2] = useState();
    const router = useRouter();

    const [formPersonaje, setFormPersonaje] = useState({
        nombre: "",
        edad: "",
        genero: "",
    });

    const [mostrarForm, setMostrarForm] = useState(false);

    const getData = async () => {
        let response = await fetch(`http://localhost:3000/api/user/${id}`, {
            method: "GET",
        });
        let data = await response.json();
        setFormPersonaje({
            nombre: data.data.nombre,
            edad: data.data.edad,
            genero: data.data.genero,
        });
    };

    useEffect(() => {
        if (id) {
            getData();
        } else {
            return;
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormPersonaje({
            ...formPersonaje,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
            form.set("nombre", formPersonaje.nombre);
            form.set("edad", formPersonaje.edad);
            form.set("genero", formPersonaje.genero);
            form.append("imagen1", file1);
            form.append("imagen2", file2);

        if (id) {
            let response = await fetch(`http://localhost:3000/api/user/${id}`, {
                method: "PUT",
                body: form,
            });

            let data = await response.json();

            if (data.code == 200) {
                showSuccessAlert(data.message);
                setTimeout(function () {
                    location.reload();
                }, 1000);
            } else {
                showErrorAlert(data.message);
            }
        } else {

            let response = await fetch("http://localhost:3000/api/user", {
                method: "POST",
                body: form,
            });
            let data = await response.json();

            if (data.code == 200) {
                showSuccessAlert(data.message);
                setTimeout(function () {
                    router.push('/personajes')
                }, 1000);
            } else {
                showErrorAlert(data.message);
            }
        }
    };

    return (
        <div className="pt-6">
            <div className="flex justify-center">
                <button
                    onClick={(e) => {
                        setMostrarForm(!mostrarForm);
                    }}
                    className={`rounded-md px-2 py-2 mt-10 w-[10rem]  text-white bg-gradient-to-r text-center from-sky-500 to-indigo-500 transition-all hover:from-violet-500 hover:to-fuchsia-500 
                ${id || mostrarForm ? "hidden" : "block"} `}
                    type="submit"
                >
                    Crear Personaje
                </button>
            </div>
            <div
                className={`justify-center items-center h-[45rem] ${
                    !id && !mostrarForm ? "hidden" : "flex"
                } `}
            >
                <form
                    className="text-xl rounded-xl flex-col flex  p-4 justify-center  bg-transparent w-96 h-96"
                    onSubmit={handleSubmit}
                >
                    <div className={`flex justify-end items-end ${id ? "hidden" : "flex"}` } >  
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-7 h-7 cursor-pointer text-red-600"
                                onClick={(e) => {
                                    setMostrarForm(false);
                                }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                    </div>
                    <h1 className="text-center my-5 text-5xl text-sky-500">
                        {id ? "Modificar Personaje" : "Crear Personaje"}
                    </h1>
                    <Image
                        className="bg-transparent block mx-auto py-6"
                        src="/cartman.gif"
                        alt="Logo"
                        width={150}
                        height={150}
                    />

                    <label className="dark:text-white" htmlFor="nombre">
                        Nombre
                    </label>
                    <input
                        className="rounded-md w-full border-solid border-4 border-indigo-600 mb-4"
                        type="text"
                        name="nombre"
                        id=""
                        onChange={handleChange}
                        value={formPersonaje.nombre}
                    />

                    <label className="dark:text-white" htmlFor="edad">
                        Edad
                    </label>
                    <input
                        className="rounded-md w-full border-solid border-4 border-indigo-600 mb-4"
                        type="number"
                        name="edad"
                        id=""
                        onChange={handleChange}
                        value={formPersonaje.edad}
                    />

                    <label className="dark:text-white" htmlFor="genero">
                        Género
                    </label>
                    <input
                        className="rounded-md w-full border-solid border-4 border-indigo-600 mb-4"
                        type="text"
                        name="genero"
                        id=""
                        onChange={handleChange}
                        value={formPersonaje.genero}
                    />

                    <label className="block space-y-2" htmlFor="imagen">
                        <span>Imagen 1</span>
                        <input
                            type="file"
                            className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-violet-50 file:text-violet-700
                            hover:file:bg-violet-100
                            "
                            name="imagen1"
                            onChange={(e) => {
                                setFile1(e.target.files[0]);
                            }}
                        />
                    </label>

                    <label className="block space-y-2" htmlFor="imagen">
                        <span>Imagen 2</span>
                        <input
                            type="file"
                            className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-violet-50 file:text-violet-700
                            hover:file:bg-violet-100
                            "
                            name="imagen2"
                            onChange={(e) => {
                                setFile2(e.target.files[0]);
                            }}
                        />
                    </label>

                    <div className="flex justify-center w-50">
                        <button
                            className="rounded-md px-2 py-2 mt-10 w-[10rem] 
                        text-white
                        bg-gradient-to-r from-sky-500 to-indigo-500
                        transition-all hover:from-violet-500 hover:to-fuchsia-500

                        "
                            type="submit"
                        >
                            {id ? "Modificar" : "Crear"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
