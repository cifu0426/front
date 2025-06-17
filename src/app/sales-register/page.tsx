"use client";
import React, { useState } from 'react';
import CardSetSales from '@/components/CardSetSales/CardSetSales';
import SaleModal from '@/components/Modal/SaleModal';
import { useSales } from '@/hooks/useSales';

export default function Home() {
  const { ventas, loadingVentas, errorVentas, totalRevenue, removeSale, createSale, editSale } = useSales();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedSale, setSelectedSale] = useState<any>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  const handleEdit = (id: number) => {
    const sale = ventas.find(v => v.id === id);
    if (sale) {
      setSelectedSale(sale);
      setModalMode('edit');
      setShowCreateForm(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar la venta #${id}?`)) {
      const result = await removeSale(id.toString());
      if (result.success) {
        alert('Venta eliminada exitosamente');
      } else {
        alert(`Error al eliminar la venta: ${result.error}`);
      }
    }
  };

  const handleCreateNew = () => {
    setSelectedSale(null);
    setModalMode('create');
    setShowCreateForm(true);
  };

  const handleSaveModal = async (saleData: any) => {
    if (modalMode === 'create') {
      return await createSale(saleData);
    } else {
      return await editSale(selectedSale.id.toString(), saleData);
    }
  };

  const handleCloseModal = () => {
    setShowCreateForm(false);
    setSelectedSale(null);
  };

  if (loadingVentas) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
              <span className="text-5xl mr-3">📊</span> 
              REGISTRO DE VENTAS
            </h1>
            <p className="text-gray-600 mb-8">Gestiona y visualiza todas las ventas de tu negocio</p>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-4 text-gray-600">Cargando ventas...</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (errorVentas) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
              <span className="text-5xl mr-3">📊</span> 
              REGISTRO DE VENTAS
            </h1>
            <p className="text-gray-600 mb-8">Gestiona y visualiza todas las ventas de tu negocio</p>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-center">
                <div className="text-red-600 mb-4">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-xl font-semibold">Error al cargar ventas</p>
                  <p className="text-sm mt-2 text-gray-600">{errorVentas.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            <span className="text-5xl mr-3">📊</span> 
            REGISTRO DE VENTAS
          </h1>
          <p className="text-gray-600 mb-4">Gestiona y visualiza todas las ventas de tu negocio</p>
          
          {/* Botón Crear Nueva Venta */}
          <div className="mb-6">
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Crear Nueva Venta
            </button>
          </div>
          
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-2xl font-bold text-green-600">{ventas.length}</div>
              <div className="text-sm text-gray-600">Total de Ventas</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-2xl font-bold text-blue-600">
                {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(totalRevenue)}
              </div>
              <div className="text-sm text-gray-600">Ingresos Totales</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-2xl font-bold text-purple-600">
                {ventas.length > 0 ? new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(totalRevenue / ventas.length) : '€0.00'}
              </div>
              <div className="text-sm text-gray-600">Promedio por Venta</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <CardSetSales 
            sales={ventas}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* Modal para crear/editar ventas */}
        <SaleModal
          isOpen={showCreateForm}
          onClose={handleCloseModal}
          onSave={handleSaveModal}
          sale={selectedSale}
          mode={modalMode}
        />
      </div>
    </main>
  );
}
