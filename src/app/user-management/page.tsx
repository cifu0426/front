// components/UserManagement.tsx
"use client"

import { useState, useEffect } from "react"

export default function UserManagement() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Simulamos una carga de usuarios (esto se puede conectar a una API luego)
    const mockUsers = Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      name: `Name ${i + 1}`,
      email: `user${i + 1}@mail.com`,
      role: "Admin"
    }))
    setUsers(mockUsers)
  }, [])

  const handleDelete = (id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id))
  }

  return (
    <div className="flex flex-col items-center bg-sky-200 min-h-screen pt-10">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 flex items-center">
        <span className="text-4xl mr-2">🐾</span> SYSTEM USERS
      </h1>

      <div className="bg-sky-100 rounded-xl p-6 shadow-md border border-blue-500 w-full max-w-4xl">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-blue-900 bg-blue-100">
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">Role</th>
              <th className="py-2 px-3">Edit</th>
              <th className="py-2 px-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr
                key={user.id}
                className="border-t border-blue-300 hover:bg-blue-50 transition-colors text-blue-900"
              >
                <td className="py-2 px-3">{user.name}</td>
                <td className="py-2 px-3">{user.email}</td>
                <td className="py-2 px-3">{user.role}</td>
                <td className="py-2 px-3 cursor-pointer text-blue-700 hover:underline">
                  Editar
                </td>
                <td
                  className="py-2 px-3 cursor-pointer text-red-600 hover:underline"
                  onClick={() => handleDelete(user.id)}
                >
                  Eliminar
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
