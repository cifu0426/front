'use client';

import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductModal from '@/components/Modal/ProductModal';
import { IProduct } from '@/types';
import { FaPlus, FaEdit, FaTrash, FaBox, FaTag, FaLayerGroup } from 'react-icons/fa';

export default function ProductsPage() {
  const { productos, loadingProductos, createProduct, editProduct, removeProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  const handleOpenModal = (mode: 'create' | 'edit', product?: IProduct) => {
    setModalMode(mode);
    setSelectedProduct(product || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveProduct = async (productData: any): Promise<{ success: boolean; error?: string }> => {
    try {
      let result;
      if (modalMode === 'create') {
        result = await createProduct(productData);
      } else if (selectedProduct) {
        result = await editProduct(selectedProduct.id.toString(), productData);
      }
      if (result?.success) {
        handleCloseModal();
      }
      return result || { success: false, error: 'Error al guardar el producto' };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      await removeProduct(id);
    }
  };

  if (loadingProductos) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            <span className="text-5xl mr-3">📦</span>
            GESTIÓN DE PRODUCTOS
          </h1>
          <p className="text-gray-600 mb-8">Administra el catálogo de productos de tu negocio</p>

          <button
            onClick={() => handleOpenModal('create')}
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <FaPlus className="mr-2" /> Nuevo Producto
          </button>
        </div>

        <div className="space-y-4">
          {productos.map((product: IProduct) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-6">
                    <div className="bg-blue-100 p-4 rounded-xl">
                      <FaBox className="text-blue-600 text-3xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.nombre}</h2>
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center text-gray-600">
                          <FaTag className="text-blue-500 text-xl mr-3" />
                          <span className="font-medium text-lg">Precio:</span>
                          <span className="ml-2 text-xl font-bold text-blue-600">
                            {new Intl.NumberFormat('es-MX', {
                              style: 'currency',
                              currency: 'MXN'
                            }).format(product.precio)}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <FaLayerGroup className="text-blue-500 text-xl mr-3" />
                          <span className="font-medium text-lg">Categoría:</span>
                          <span className="ml-2 px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-base">
                            {product.categoria}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleOpenModal('edit', product)}
                      className="p-3 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar producto"
                    >
                      <FaEdit className="text-xl" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id.toString())}
                      className="p-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar producto"
                    >
                      <FaTrash className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveProduct}
          product={selectedProduct}
          mode={modalMode}
        />
      </div>
    </div>
  );
} 