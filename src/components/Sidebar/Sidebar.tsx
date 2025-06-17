"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FaBars } from "react-icons/fa"  // Ícono hamburguesa

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)  // Estado para mostrar u ocultar el menú
  const router = useRouter()

  return (
    <div className="h-full bg-white shadow-md p-4 min-h-screen w-[300px]">
      <div 
        className="mb-4 cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)} // Alterna visibilidad del menú
      >
        <FaBars className="hover:text-blue-500" /> {/* Ícono hamburguesa con efecto hover */}
      </div>

      {isOpen && (
        <ul className="text-sm space-y-2 text-blue-900">
          <li className="cursor-pointer hover:underline" onClick={() => router.push("/user-management")}>User management</li>
          <li className="cursor-pointer hover:underline" onClick={() => router.push("/purchase-register")}>Purchase Register</li>
          <li className="cursor-pointer hover:underline" onClick={() => router.push("/sales-register")}>Sales register</li>
          <li className="cursor-pointer hover:underline" onClick={() => router.push("/sales-report")}>Sales report</li>
          <li className="cursor-pointer hover:underline" onClick={() => router.push("/all-products")}>All products</li>
        </ul>
      )}
    </div>
  )
}