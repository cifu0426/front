"use client";

import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useProducts } from '@/hooks/useProducts';
import { useSales } from '@/hooks/useSales';
import { usePurchases } from '@/hooks/usePurchases';
import { useUsers } from '@/hooks/useUsers';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { getUserInfo, logout } = useAuth();
  const router = useRouter();
  const userInfo = getUserInfo();

  // Use custom hooks for data fetching
  const { productos, loadingProductos } = useProducts();
  const { 
    ventas, 
    totalRevenue, 
    totalRevenueToday, 
    totalRevenueWeek, 
    totalRevenueMonth, 
    loadingVentas 
  } = useSales();
  const { compras, totalExpenses, loadingCompras } = usePurchases();
  const { usuarios, loadingUsuarios } = useUsers();

  // Calculate statistics
  const totalProductos = productos.length;
  const totalVentas = ventas.length;
  const totalCompras = compras.length;
  const totalUsuarios = usuarios.length;
  const gananciaNeta = totalRevenue - totalExpenses;

  const isLoading = loadingProductos || loadingVentas || loadingCompras || loadingUsuarios;

  // Format currency function
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  // Navigation functions
  const navigateTo = (path: string) => {
    router.push(path);
  };

  // Get recent sales (last 5)
  const recentSales = ventas.slice(-5).reverse();

  // Get low stock alerts (simulated)
  const lowStockProducts = productos.filter((_: any, index: number) => index % 4 === 0).slice(0, 3);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center">
                <span className="text-5xl mr-3">📊</span>
                Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Panel de control y estadísticas del negocio</p>
            </div>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors font-medium shadow-md"
            >
              Cerrar Sesión
            </button>
          </div>

          {/* User Info */}
          {userInfo && (
            <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">👤</span>
                Información del Usuario
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Usuario:</span>
                  <p className="text-gray-900 font-semibold">{userInfo.sub}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Rol:</span>
                  <p className="text-gray-900 font-semibold">{userInfo.role}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Sesión válida hasta:</span>
                  <p className="text-gray-900 font-semibold">{new Date(userInfo.exp * 1000).toLocaleString('es-ES')}</p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <span className="text-2xl mr-2">⚡</span>
              Acciones Rápidas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => navigateTo('/sales-register')}
                className="flex items-center justify-center p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Nueva Venta
              </button>
              <button
                onClick={() => navigateTo('/purchase-register')}
                className="flex items-center justify-center p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Nueva Compra
              </button>
              <button
                onClick={() => navigateTo('/product-register')}
                className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Ver Productos
              </button>
              <button
                onClick={() => navigateTo('/user-register')}
                className="flex items-center justify-center p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Ver Usuarios
              </button>
            </div>
          </div>

          {/* Main Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
              onClick={() => navigateTo('/product-register')}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Productos</p>
                  {isLoading ? (
                    <div className="animate-pulse h-8 bg-blue-400 rounded mt-2"></div>
                  ) : (
                    <p className="text-3xl font-bold">{totalProductos}</p>
                  )}
                  <p className="text-blue-200 text-xs mt-1">En inventario</p>
                </div>
                <div className="text-5xl opacity-80">📦</div>
              </div>
            </div>

            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
              onClick={() => navigateTo('/sales-register')}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Ventas</p>
                  {isLoading ? (
                    <div className="animate-pulse h-8 bg-green-400 rounded mt-2"></div>
                  ) : (
                    <p className="text-3xl font-bold">{totalVentas}</p>
                  )}
                  <p className="text-green-200 text-xs mt-1">Registradas</p>
                </div>
                <div className="text-5xl opacity-80">💰</div>
              </div>
            </div>

            <div 
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
              onClick={() => navigateTo('/purchase-register')}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Compras</p>
                  {isLoading ? (
                    <div className="animate-pulse h-8 bg-purple-400 rounded mt-2"></div>
                  ) : (
                    <p className="text-3xl font-bold">{totalCompras}</p>
                  )}
                  <p className="text-purple-200 text-xs mt-1">Realizadas</p>
                </div>
                <div className="text-5xl opacity-80">🛒</div>
              </div>
            </div>

            <div 
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
              onClick={() => navigateTo('/user-register')}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Usuarios</p>
                  {isLoading ? (
                    <div className="animate-pulse h-8 bg-orange-400 rounded mt-2"></div>
                  ) : (
                    <p className="text-3xl font-bold">{totalUsuarios}</p>
                  )}
                  <p className="text-orange-200 text-xs mt-1">Registrados</p>
                </div>
                <div className="text-5xl opacity-80">👥</div>
              </div>
            </div>
          </div>

          {/* Alerts and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Alerts */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">🚨</span>
                Alertas Importantes
              </h3>
              <div className="space-y-3">
                {gananciaNeta < 0 && (
                  <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                    <svg className="w-5 h-5 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <p className="text-red-800 font-medium">Pérdidas detectadas</p>
                      <p className="text-red-600 text-sm">Los gastos superan los ingresos</p>
                    </div>
                  </div>
                )}
                {lowStockProducts.map((product: any, index: number) => (
                  <div key={index} className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <svg className="w-5 h-5 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <div>
                      <p className="text-yellow-800 font-medium">Stock bajo</p>
                      <p className="text-yellow-600 text-sm">{product.nombre} - Reabastecer pronto</p>
                    </div>
                  </div>
                ))}
                {gananciaNeta >= 0 && lowStockProducts.length === 0 && (
                  <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-green-800 font-medium">Todo en orden</p>
                      <p className="text-green-600 text-sm">No hay alertas críticas</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Sales */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">📈</span>
                Ventas Recientes
              </h3>
              <div className="space-y-3">
                {recentSales.length > 0 ? (
                  recentSales.map((sale) => (
                    <div key={sale.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Venta #{sale.id}</p>
                        <p className="text-sm text-gray-600">{sale.cliente} - {sale.fecha}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{formatCurrency(sale.total || 0)}</p>
                        <p className={`text-xs px-2 py-1 rounded-full ${
                          sale.estado === 'Completada' ? 'bg-green-100 text-green-700' :
                          sale.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {sale.estado}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No hay ventas recientes</p>
                )}
              </div>
            </div>
          </div>

          {/* Financial Summary and Revenue Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Financial Summary */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="text-2xl mr-2">💼</span>
                Resumen Financiero
              </h3>
              {isLoading ? (
                <div className="space-y-4">
                  <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                  <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                  <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="text-gray-700 font-medium">💵 Ingresos por Ventas:</span>
                    <span className="font-bold text-green-600 text-lg">{formatCurrency(totalRevenue)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                    <span className="text-gray-700 font-medium">💸 Gastos en Compras:</span>
                    <span className="font-bold text-red-600 text-lg">{formatCurrency(totalExpenses)}</span>
                  </div>
                  <hr className="my-4 border-gray-300" />
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-semibold text-gray-800 text-lg">📈 Ganancia Neta:</span>
                    <span className={`font-bold text-xl ${gananciaNeta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(gananciaNeta)}
                    </span>
                  </div>
                  
                  {/* Profit Margin */}
                  {totalRevenue > 0 && (
                    <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                      <span className="text-gray-700 font-medium">📊 Margen de Ganancia:</span>
                      <span className={`font-bold ${(gananciaNeta / totalRevenue * 100) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {((gananciaNeta / totalRevenue) * 100).toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Revenue Breakdown */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="text-2xl mr-2">📈</span>
                Ingresos por Período
              </h3>
              {isLoading ? (
                <div className="space-y-4">
                  <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                  <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                  <div className="animate-pulse h-4 bg-gray-300 rounded"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="text-gray-700 font-medium">🌅 Hoy:</span>
                    <span className="font-bold text-blue-600">{formatCurrency(totalRevenueToday)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg">
                    <span className="text-gray-700 font-medium">📅 Esta Semana:</span>
                    <span className="font-bold text-indigo-600">{formatCurrency(totalRevenueWeek)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <span className="text-gray-700 font-medium">🗓️ Este Mes:</span>
                    <span className="font-bold text-purple-600">{formatCurrency(totalRevenueMonth)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="text-gray-700 font-medium">📊 Total General:</span>
                    <span className="font-bold text-green-600 text-lg">{formatCurrency(totalRevenue)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activity Summary */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="text-2xl mr-2">🔄</span>
              Resumen de Actividad
            </h3>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse h-16 bg-gray-300 rounded"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div 
                  className="text-center p-4 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
                  onClick={() => navigateTo('/sales-register')}
                >
                  <div className="text-2xl mb-2">💰</div>
                  <div className="text-2xl font-bold text-green-600">{totalVentas}</div>
                  <div className="text-sm text-gray-600">Ventas Totales</div>
                </div>
                <div 
                  className="text-center p-4 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors"
                  onClick={() => navigateTo('/purchase-register')}
                >
                  <div className="text-2xl mb-2">🛒</div>
                  <div className="text-2xl font-bold text-purple-600">{totalCompras}</div>
                  <div className="text-sm text-gray-600">Compras Totales</div>
                </div>
                <div 
                  className="text-center p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => navigateTo('/product-register')}
                >
                  <div className="text-2xl mb-2">📦</div>
                  <div className="text-2xl font-bold text-blue-600">{totalProductos}</div>
                  <div className="text-sm text-gray-600">Productos Activos</div>
                </div>
                <div 
                  className="text-center p-4 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
                  onClick={() => navigateTo('/user-register')}
                >
                  <div className="text-2xl mb-2">👥</div>
                  <div className="text-2xl font-bold text-orange-600">{totalUsuarios}</div>
                  <div className="text-sm text-gray-600">Usuarios Sistema</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
