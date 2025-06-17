"use client";

import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  const { getUserInfo, logout } = useAuth();
  const userInfo = getUserInfo();

  return (
    <ProtectedRoute>
      <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Cerrar Sesión
        </button>
      </div>

      {userInfo && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-2">Información del Usuario</h2>
          <p><strong>Usuario:</strong> {userInfo.sub}</p>
          <p><strong>Rol:</strong> {userInfo.role}</p>
          <p><strong>Token válido hasta:</strong> {new Date(userInfo.exp * 1000).toLocaleString()}</p>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}
