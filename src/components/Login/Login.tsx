"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter(); // Hook de navegación
  const [formData, setFormData] = useState({ username: "", password: "" }); // Estado del formulario

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Desestructura el nombre y valor del input
    setFormData((prev) => ({ ...prev, [name]: value })); // Actualiza el estado
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    console.log("Login attempt:", formData); // Simula login
    router.push("/dashboard"); // Redirige al dashboard
  };

  return (
    <div className="w-1/2 flex items-center justify-center">
      {/* Contenedor centrado */}
      <div className="w-full max-w-md px-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-8">LOG IN TO YOUR ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          {/* Campo de Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-blue-900 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 bg-sky-100 rounded-md text-black"
              required
            />
          </div>

          {/* Campo de Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-blue-900 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-sky-100 rounded-md text-black"
              required
            />
          </div>

          {/* Botón de Login */}
          <div className="flex justify-center mb-6">
            <button
              type="submit"
              className="bg-yellow-300 hover:bg-yellow-400 text-blue-900 font-medium py-2 px-8 rounded-md"
            >
              Log in
            </button>
          </div>

          {/* Links de abajo */}
          <div className="flex justify-between text-sky-400 text-sm border-t pt-4">
            <Link href="/forgot-password" className="hover:underline">
              Forgot the password?
            </Link>
            <Link href="/register" className="hover:underline">
              Create new account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
