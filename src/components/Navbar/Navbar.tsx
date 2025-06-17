"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FaUser } from "react-icons/fa"  // Ícono de usuario

export default function Navbar() {
  const router = useRouter();  // Hook para redirección
  const [username, setUsername] = useState("")  // Estado del nombre de usuario

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")  // Obtiene el nombre guardado
    if (storedUsername) setUsername(storedUsername)  // Si existe, lo guarda en el estado
  }, [])

  return (
    <div className="w-full h-14 bg-sky-300 flex items-center justify-between px-4">
      <h1 
        className="text-2xl font-bold text-blue-900 cursor-pointer hover:underline"
        onClick={() => router.push("/dashboard")}
      >
        PET MANAGER {/* Redirige al dashboard al hacer clic */}
      </h1>

      <div className="flex items-center gap-2">
        <span className="text-blue-900 font-bold">{username ? username : "Account"}</span> {/* Muestra nombre de usuario */}
        <FaUser 
          className="text-blue-900 cursor-pointer hover:text-blue-700"  // Cambia color al pasar el mouse
          onClick={() => router.push("/user-info")}  // Redirige a la página de información del usuario
        />
      </div>
    </div>
  )
}