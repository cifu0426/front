"use client";
import React, { useState } from 'react';
import CardSetPurchase from '@/components/CardSetPurchase/CardSetPurchase';
import PurchaseModal from '@/components/Modal/PurchaseModal';
import { usePurchases } from '@/hooks/usePurchases';

export default function Home() {
  const { compras, loadingCompras, errorCompras, totalExpenses, removePurchase, createPurchase, editPurchase } = usePurchases();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<any>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  const handleEdit = (id: number) => {
    const purchase = compras.find(c => c.id === id);
    if (purchase) {
      setSelectedPurchase(purchase);
      setModalMode('edit');
      setShowCreateForm(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar la compra #${id}?`)) {
      const result = await removePurchase(id.toString());
      if (result.success) {
        alert('Compra eliminada exitosamente');
      } else {
        alert(`Error al eliminar la compra: ${result.error}`);
      }
    }
  };

  const handleCreateNew = () => {
    setSelectedPurchase(null);
    setModalMode('create');
    setShowCreateForm(true);
  };

  const handleSaveModal = async (purchaseData: any) => {
    if (modalMode === 'create') {
      return await createPurchase(purchaseData);
    } else {
      return await editPurchase(selectedPurchase.id.toString(), purchaseData);
    }
  };

  const handleCloseModal = () => {
    setShowCreateForm(false);
    setSelectedPurchase(null);
  };

  if (loadingCompras) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
              <span className="text-5xl mr-3">📦</span> 
              REGISTRO DE COMPRAS
            </h1>
            <p className="text-gray-600 mb-8">Gestiona y visualiza todas las compras de tu negocio</p>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                <span className="ml-4 text-gray-600">Cargando compras...</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (errorCompras) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
              <span className="text-5xl mr-3">📦</span> 
              REGISTRO DE COMPRAS
            </h1>
            <p className="text-gray-600 mb-8">Gestiona y visualiza todas las compras de tu negocio</p>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-center">
                <div className="text-red-600 mb-4">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-xl font-semibold">Error al cargar compras</p>
                  <p className="text-sm mt-2 text-gray-600">{errorCompras.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            <span className="text-5xl mr-3">📦</span> 
            REGISTRO DE COMPRAS
          </h1>
          <p className="text-gray-600 mb-4">Gestiona y visualiza todas las compras de tu negocio</p>
          
          {/* Botón Crear Nueva Compra */}
          <div className="mb-6">
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Crear Nueva Compra
            </button>
          </div>
          
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-2xl font-bold text-purple-600">{compras.length}</div>
              <div className="text-sm text-gray-600">Total de Compras</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-2xl font-bold text-red-600">
                {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(totalExpenses)}
              </div>
              <div className="text-sm text-gray-600">Gastos Totales</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-2xl font-bold text-orange-600">
                {compras.length > 0 ? new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(totalExpenses / compras.length) : '€0.00'}
              </div>
              <div className="text-sm text-gray-600">Promedio por Compra</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <CardSetPurchase 
            purchases={compras}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* Modal para crear/editar compras */}
        <PurchaseModal
          isOpen={showCreateForm}
          onClose={handleCloseModal}
          onSave={handleSaveModal}
          purchase={selectedPurchase}
          mode={modalMode}
        />
      </div>
    </main>
  );
}
