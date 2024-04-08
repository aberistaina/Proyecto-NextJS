"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession} from "next-auth/react";

export default function Navbar() {
    let [darkMode, setDarkMode] = useState(false);
    const pathname = usePathname();
    let [admin, setAdmin] = useState(false);

    const [menuIcon, setMenuIcon] = useState(false);
    const { data: session, status } = useSession();




    function handleClick() {
        setDarkMode(!darkMode);
    }

    useEffect(() => {
        if (session) {
            async function findUser() {
                let response = await fetch(`http://localhost:3000/api/usuarios/${session.user.email}`, {
                method: "GET",
        });
            let data = await response.json()

            if(data.data.admin == true){
                setAdmin(true)
            }
            }
            findUser();
        }else{
            setAdmin(false)
        }
    }, [session]);

    useEffect(() => {
        if (darkMode == true) {
            document.querySelector("html").classList.add("dark");
        } else {
            document.querySelector("html").classList.remove("dark");
        }
    });

    return (
        <nav className="bg-white shadow dark:bg-slate-400 px-6 ">
            <div className="flex h-16 items-center justify-between max-w-7xl mx-auto">
                <button
                    className="text-slate-950 hover:text-slate-900 hover:bg-slate-100 rounded p-1 -m-1 transition-colors focus:ring-2 md:hidden"
                    onClick={(e) => {
                        setMenuIcon(!menuIcon);
                    }}
                >
                    <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </button>
                <div className="mx-auto md:mx-0">
                    <Link href="/">
                        <Image
                            className="bg-transparent"
                            src="/logo2.png"
                            alt="Logo"
                            width={100}
                            height={100}
                        />
                    </Link>
                </div>
                <div className="flex -mr-4 items-center">
                    <div className="space-x-8 ml-8 hidden md:block">
                        <Link
                            className={` px-3 py-2 dark:hover:text-slate-50 hover:text-sky-500 transition-colors ${
                                pathname == "/"
                                    ? "text-sky-500 font-bold dark:text-white"
                                    : "text-slate-950"
                            }`}
                            href="/"
                        >
                            Home
                        </Link>
                        <Link
                            className={` px-3 py-2 dark:hover:text-slate-50 hover:text-sky-500 transition-colors ${
                                pathname == "/personajes"
                                    ? "text-sky-500 font-bold dark:text-white"
                                    : "text-slate-950"
                            }`}
                            href="/personajes"
                        >
                            Personajes
                        </Link>
                        <Link
                            className={` px-3 py-2 dark:hover:text-slate-50 hover:text-sky-500 transition-colors ${
                                pathname == "/about"
                                    ? "text-sky-500 font-bold dark:text-white"
                                    : "text-slate-950"
                            }`}
                            href="/createPage"
                        >
                            Manejador
                        </Link>
                        <Link
                            className={` px-3 py-2 dark:hover:text-slate-50 hover:text-sky-500 transition-colors ${
                                pathname == "/hola"
                                    ? "text-sky-500 font-bold dark:text-white"
                                    : "text-slate-950"
                            } ${admin == true ? "inline" : "hidden"} ` }
                            href="/dashboard"
                        >
                            Dashboard
                        </Link>
                    </div>
                </div>

                <div className="flex ">
                    <button
                        onClick={handleClick}
                        className="rounded-full hover:text-sky-500 dark:hover:text-slate-50 transition-colors focus:ring-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                            />
                        </svg>
                    </button>

                    <button className="h-6 w-6 rounded-full focus:ring-2 focus:ring-offset-1 ml-4">
                        {session ? (
                            <Link href="/myacount">
                                <img
                                    className="rounded-full"
                                    src="https://ui-avatars.com/api?name=Alejandro+Beristain"
                                    alt="Alejandro Beristain"
                                />
                            </Link>
                        ) : (
                            <Link href="/auth/login">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                </svg>
                            </Link>
                        )}
                    </button>

                    <button
                        className={`h-6 w-6 rounded-full focus:ring-2 focus:ring-offset-1 ml-4 ${
                            session ? "block" : "hidden"
                        }`}
                    >
                        <Link href="/api/auth/signout">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                                />
                            </svg>
                        </Link>
                    </button>
                </div>
            </div>
            <div
                className={`space-y-1 pb-3 pt-2 border-t md:hidden sm: ${
                    menuIcon == false ? "hidden" : "block"
                }`}
            >
                <Link
                    className={`text-slate-600 hover:bg-sky-500 hover:text-white block px-3 py-2 transition-colors rounded ${
                        pathname == "/"
                            ? "bg-sky-500 text-white"
                            : "text-slate-500"
                    }`}
                    href="/"
                >
                    Home
                </Link>
                <Link
                    className={`text-slate-600 hover:bg-sky-500 hover:text-white block px-3 py-2 transition-colors rounded ${
                        pathname == "/personajes"
                            ? "bg-sky-500 text-white"
                            : "text-slate-600"
                    }`}
                    href="/personajes"
                >
                    Personajes
                </Link>
                <Link
                    className={`text-slate-600 hover:bg-sky-500 hover:text-white block px-3 py-2 transition-colors rounded ${
                        pathname == "/about"
                            ? "bg-sky-500 text-white"
                            : "text-slate-600"
                    }`}
                    href="/about"
                >
                    About
                </Link>
                <Link
                    className={`text-slate-600 hover:bg-sky-500 hover:text-white block px-3 py-2 transition-colors rounded ${
                        pathname == "/contacto"
                            ? "bg-sky-500 text-white"
                            : "text-slate-600"
                    }`}
                    href="/dashboard"
                >
                    Dashboard
                </Link>
            </div>
        </nav>
    );
}
