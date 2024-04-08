"use client";
import { useState, useEffect } from "react";
import { showSuccessAlert, showErrorAlert, showWarningAlert, showConfirmation } from "@/app/components/Alertas";
import Link from "next/link";


export default function TablaPersonajes() {
    const [personajes, setPersonajes] = useState([]);

    const getData = async () => {
        
        let response = await fetch("http://localhost:3000/api/user", {
            method: "GET",
        });
        let data = await response.json();
        setPersonajes(data.data);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleClick = async(e) =>{

        let id = e.target.dataset.id
        

        const confirmacion = await showConfirmation("Confirmar eliminación", "¿Estás seguro de que deseas eliminar este elemento?");
        

        if(confirmacion.isConfirmed){
            let response = await fetch(`http://localhost:3000/api/user/${id}`, {
            method: "DELETE",
        });
            let data = await response.json();
            if(data.code == 200){
                showSuccessAlert(data.message)
                setTimeout(() => {
                    location.reload();
                }, 2000);
                
            }else{
                showErrorAlert(data.error)
            }

        }
        
    }

    return (
        <div className="flex justify-center items-center mt-10 overflow-x-auto">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Edad</th>
                        <th className="px-4 py-2">Género</th>
                        <th className="px-4 py-2">Modificar</th>
                        <th className="px-4 py-2">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {personajes.map((personaje) => (
                        <tr key={personaje.id}>
                            <td className="border px-4 py-2">{personaje.id}</td>
                            <td className="border px-4 py-2">
                                {personaje.nombre}
                            </td>
                            <td className="border px-4 py-2">
                                {personaje.edad}
                            </td>
                            <td className="border px-4 py-2">
                                {personaje.genero}
                            </td>
                            <td className="border px-4 py-2">
                                <Link href={`updatePage/${personaje.id}`}><button   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Modificar
                                </button></Link>
                            </td>
                            <td className="border px-4 py-2">
                                <button onClick={handleClick} data-id= {personaje.id} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
