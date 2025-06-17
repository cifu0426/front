"use client";
import React, { useState } from 'react';
import CardSetProducts from '@/components/CardSetProducts/CardSetProducts';
import ProductModal from '@/components/Modal/ProductModal';
import { useProducts } from '@/hooks/useProducts';
import { IProduct } from '@/types';

export default function ProductRegister() {
  const { 
    productos, 
    loadingProductos, 
    errorProductos, 
    createProduct, 
    updateProduct, 
    removeProduct 
  } = useProducts();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const handleCreateNew = () => {
    setSelectedProduct(null);
    setModalMode('create');
    setModalOpen(true);
  };

  const handleEdit = (id: number) => {
    const product = productos.find((p: any) => p.id === id);
    if (product) {
      setSelectedProduct(product);
      setModalMode('edit');
      setModalOpen(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar este producto?`)) {
      const result = await removeProduct(id.toString());
      if (result.success) {
        alert('Producto eliminado exitosamente');
      } else {
        alert(`Error al eliminar el producto: ${result.error}`);
      }
    }
  };

  const handleSaveProduct = async (productData: Partial<IProduct>) => {
    if (modalMode === 'create') {
      return await createProduct(productData);
    } else if (selectedProduct) {
      return await updateProduct(selectedProduct.id, productData);
    }
    return { success: false, error: 'Error en el modo del modal' };
  };

  if (loadingProductos) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
              <span className="text-5xl mr-3">📦</span> 
              REGISTRO DE PRODUCTOS
            </h1>
            <p className="text-gray-600 mb-8">Gestiona el inventario de productos de tu negocio</p>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-4 text-gray-600">Cargando productos...</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (errorProductos) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
              <span className="text-5xl mr-3">📦</span> 
              REGISTRO DE PRODUCTOS
            </h1>
            <p className="text-gray-600 mb-8">Gestiona el inventario de productos de tu negocio</p>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="text-center">
                <div className="text-red-600 mb-4">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p className="text-xl font-semibold">Error al cargar productos</p>
                  <p className="text-sm mt-2 text-gray-600">{errorProductos.message}</p>
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
            <span className="text-5xl mr-3">📦</span> 
            REGISTRO DE PRODUCTOS
          </h1>
          <p className="text-gray-600 mb-4">Gestiona el inventario de productos de tu negocio</p>
          
          {/* Botón Crear Nuevo Producto */}
          <div className="mb-6">
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Crear Nuevo Producto
            </button>
          </div>
          
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-2xl font-bold text-blue-600">{productos.length}</div>
              <div className="text-sm text-gray-600">Total de Productos</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-2xl font-bold text-green-600">
                {productos.length > 0 ? 
                  new Set(productos.map((p: any) => p.categoria)).size : 0}
              </div>
              <div className="text-sm text-gray-600">Categorías</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-2xl font-bold text-purple-600">
                {productos.length > 0 ? 
                  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' })
                    .format(productos.reduce((sum: number, p: any) => sum + p.precio, 0) / productos.length) 
                  : '€0.00'}
              </div>
              <div className="text-sm text-gray-600">Precio Promedio</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <CardSetProducts 
            products={productos}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Modal */}
      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveProduct}
        product={selectedProduct}
        mode={modalMode}
      />
    </main>
  );
} 