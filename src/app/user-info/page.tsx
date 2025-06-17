"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function UserInfoPage() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    address: "",
    phone: "",
    email: ""
  })

  const router = useRouter()

  useEffect(() => {
    // Recuperar los datos del localStorage sin redirigir al login si faltan
    const storedName = window.localStorage.getItem("name") || ""
    const storedUsername = window.localStorage.getItem("username") || ""
    const storedAddress = window.localStorage.getItem("address") || ""
    const storedPhone = window.localStorage.getItem("phone") || ""
    const storedEmail = window.localStorage.getItem("email") || ""

    setUserInfo({
      name: storedName,
      username: storedUsername,
      address: storedAddress,
      phone: storedPhone,
      email: storedEmail
    })
  }, [])

  const handleLogout = () => {
    localStorage.clear() // Elimina los datos del usuario
    router.push("/") // Redirige al login
  }

  const handleBackToDashboard = () => {
    router.push("/dashboard") // Redirige al dashboard
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
          User Information
        </h1>
        <p className="text-lg text-blue-800 mb-2">
          <strong>Name:</strong> {userInfo.name || "Not provided"}
        </p>
        <p className="text-lg text-blue-800 mb-2">
          <strong>Username:</strong> {userInfo.username || "Not provided"}
        </p>
        <p className="text-lg text-blue-800 mb-2">
          <strong>Address:</strong> {userInfo.address || "Not provided"}
        </p>
        <p className="text-lg text-blue-800 mb-2">
          <strong>Phone:</strong> {userInfo.phone || "Not provided"}
        </p>
        <p className="text-lg text-blue-800 mb-6">
          <strong>Email:</strong> {userInfo.email || "Not provided"}
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleBackToDashboard}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
          >
            Back to Dashboard
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 cursor-pointer"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}