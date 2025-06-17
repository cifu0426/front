"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validación básica
    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Por favor, completa todos los campos");
      return;
    }

    try {
      const result = await login({
        nombreusuario: formData.username,
        contrasenia: formData.password,
      });

      if (!result.success) {
        setError(result.error || "Error en el login");
      }
      // Si es exitoso, el hook se encarga de la redirección
    } catch (err) {
      setError("Error inesperado. Intenta de nuevo.");
      console.error("Error en login:", err);
    }
  };

  return (
    <div className="w-1/2 flex items-center justify-center">
      {/* Contenedor centrado */}
      <div className="w-full max-w-md px-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-8">LOG IN TO YOUR ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          {/* Mostrar errores */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {error}
            </div>
          )}

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
              disabled={loading}
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
              disabled={loading}
              required
            />
          </div>

          {/* Botón de Login */}
          <div className="flex justify-center mb-6">
            <button
              type="submit"
              disabled={loading}
              className={`font-medium py-2 px-8 rounded-md transition-colors ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-yellow-300 hover:bg-yellow-400 text-blue-900"
              }`}
            >
              {loading ? "Iniciando sesión..." : "Log in"}
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
