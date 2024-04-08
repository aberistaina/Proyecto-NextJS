"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function CardPersonajes() {
    const [personajes, setPersonajes] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const getData = async () => {
        let response = await fetch("/api/user", {
            method: "GET",
        });
        let data = await response.json();
        setPersonajes(data.data);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div
            className="mt-5 justify-center grid gap-4 max-w-7xl mx-auto
            xl:grid-cols-3
            lg:grid-cols-2
            md:grid-cols-2 
            sm:grid-cols-1"
        >
            {personajes.map((personaje, index) => (
                <div
                    key={personaje.id}
                    className="bg-sky-200 shadow rounded-2xl overflow-hidden m-4 p-4 hover:bg-sky-500 hover:cursor-pointer transition-colors hover:-rotate-1  "
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <div className="h-96 relative">
                        <Image
                            className="object-contain rounded-lg"
                            src={
                                hoveredIndex === index
                                    ? personaje.imagen2
                                    : personaje.imagen1
                            }
                            alt=""
                            layout="fill"
                            quality="100"
                            objectFit="cover"
                            objectPosition="center"
                        />

                    </div>
                    <div className="text-center space-y-3 p-5">
                        <h1 className="font-bold text-rose-700 text-2xl">
                            {personaje.nombre}
                        </h1>
                        <h3 className="font-semibold text-amber-800">
                            Edad: {personaje.edad}
                        </h3>
                        <h3 className="font-semibold text-amber-800">
                            Género: {personaje.genero}
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    );
}
