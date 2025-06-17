"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, loading, getUserInfo } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        // Si no está autenticado, redirigir al login
        router.push('/');
        return;
      }

      if (requireAdmin) {
        const userInfo = getUserInfo();
        if (!userInfo || userInfo.role !== 'ADMIN') {
          // Si requiere admin pero no lo es, redirigir al dashboard
          router.push('/dashboard');
          return;
        }
      }
    }
  }, [isAuthenticated, loading, requireAdmin, router, getUserInfo]);

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-200">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
          </div>
          <p className="text-center mt-4 text-blue-900">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, no mostrar nada (se redirigirá)
  if (!isAuthenticated) {
    return null;
  }

  // Si requiere admin pero no lo es, no mostrar nada (se redirigirá)
  if (requireAdmin) {
    const userInfo = getUserInfo();
    if (!userInfo || userInfo.role !== 'ADMIN') {
      return null;
    }
  }

  // Si todo está bien, mostrar el contenido
  return <>{children}</>;
} 