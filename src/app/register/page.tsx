"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useRegister } from "@/hooks/useRegister"

export default function RegisterPage() {
  const router = useRouter() // Para redireccionar después del registro
  const { register, loading, error } = useRegister();

  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
    email: "",
    id: ""
  })

  // Función para manejar los cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    // Validar campos requeridos
    if (!formData.username.trim() || !formData.password.trim()) {
      alert("Username and password are required")
      return
    }

    console.log('=== INICIANDO REGISTRO ===');
    console.log('Username:', formData.username);
    console.log('Password length:', formData.password.length);

    try {
      const result = await register({
        nombreusuario: formData.username.trim(),
        contrasenia: formData.password,
        rol: 1 // 1 = USER, 2 = ADMIN
      });

      console.log('=== RESULTADO DEL REGISTRO ===');
      console.log('Success:', result.success);
      console.log('Result:', result);

      if (result.success) {
        alert("¡Cuenta creada exitosamente en la base de datos! Ahora puedes hacer login.");
        // Limpiar formulario
        setFormData({
          name: "",
          username: "",
          password: "",
          confirmPassword: "",
          address: "",
          phone: "",
          email: "",
          id: ""
        });
      } else {
        alert(`Registration failed: ${result.error}`);
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Unexpected error during registration");
    }
  }

  return (
    <div className="min-h-screen bg-sky-200 flex items-center justify-center">
      {/* Contenedor blanco */}
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-blue-900 text-center mb-8">CREATE A NEW ACCOUNT</h1>

        <form onSubmit={handleSubmit}>
          {/* Mostrar errores */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-6">
            {/* Campos del formulario */}
            <div>
              <label className="block text-blue-900">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 rounded-md bg-sky-100 text-black" />
            </div>
            <div>
              <label className="block text-blue-900">Username</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} required className="w-full p-2 rounded-md bg-sky-100 text-black" />
            </div>
            <div>
              <label className="block text-blue-900">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full p-2 rounded-md bg-sky-100 text-black" />
            </div>
            <div>
              <label className="block text-blue-900">Confirm password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="w-full p-2 rounded-md bg-sky-100 text-black" />
            </div>
            <div>
              <label className="block text-blue-900">Adress</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-2 rounded-md bg-sky-100 text-black" />
            </div>
            <div>
              <label className="block text-blue-900">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 rounded-md bg-sky-100 text-black" />
            </div>
            <div>
              <label className="block text-blue-900">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 rounded-md bg-sky-100 text-black" />
            </div>
            <div>
              <label className="block text-blue-900">ID</label>
              <input type="text" name="id" value={formData.id} onChange={handleChange} className="w-full p-2 rounded-md bg-sky-100 text-black" />
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-center gap-4 mt-8">
            <button type="button" onClick={() => router.push("/")} className="bg-gray-200 hover:bg-gray-300 text-blue-900 font-medium py-2 px-6 rounded-md cursor-pointer">
              Back to Login
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-yellow-300 hover:bg-yellow-400 text-blue-900 font-medium py-2 px-6 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
