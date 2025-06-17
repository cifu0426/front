"use client";
import React, { useState, useEffect } from 'react';
import { ISales } from '@/types';
import { useProducts } from '@/hooks/useProducts';

interface SaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (sale: any) => Promise<{ success: boolean; error?: string }>;
  sale?: ISales | null;
  mode: 'create' | 'edit';
}

const SaleModal: React.FC<SaleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  sale,
  mode
}) => {
  const { productos } = useProducts();
  const [formData, setFormData] = useState({
    cliente: '',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'Pendiente' as 'Completada' | 'Pendiente' | 'Cancelada'
  });
  const [selectedProducts, setSelectedProducts] = useState<Array<{
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
  }>>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (sale && mode === 'edit') {
      setFormData({
        cliente: sale.cliente || '',
        fecha: sale.fecha || new Date().toISOString().split('T')[0],
        estado: sale.estado || 'Pendiente'
      });
      setSelectedProducts(sale.productos || []);
    } else {
      setFormData({
        cliente: '',
        fecha: new Date().toISOString().split('T')[0],
        estado: 'Pendiente'
      });
      setSelectedProducts([]);
    }
    setErrors({});
  }, [sale, mode, isOpen]);

  const calculateTotal = () => {
    return selectedProducts.reduce((sum, product) => sum + (product.precio * product.cantidad), 0);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.cliente.trim()) {
      newErrors.cliente = 'El cliente es requerido';
    }

    if (!formData.fecha) {
      newErrors.fecha = 'La fecha es requerida';
    }

    if (selectedProducts.length === 0) {
      newErrors.productos = 'Debe seleccionar al menos un producto';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const saleData = {
        cliente: formData.cliente.trim(),
        fecha: formData.fecha,
        estado: formData.estado,
        productos: selectedProducts,
        total: calculateTotal()
      };

      const result = await onSave(saleData);
      
      if (result.success) {
        onClose();
        setFormData({
          cliente: '',
          fecha: new Date().toISOString().split('T')[0],
          estado: 'Pendiente'
        });
        setSelectedProducts([]);
      } else {
        setErrors({ general: result.error || 'Error al guardar la venta' });
      }
    } catch (error) {
      setErrors({ general: 'Error inesperado al guardar la venta' });
    } finally {
      setLoading(false);
    }
  };

  const addProduct = (productId: number) => {
    const product = productos.find(p => p.id === productId);
    if (!product) return;

    const existingProduct = selectedProducts.find(p => p.id === productId);
    if (existingProduct) {
      setSelectedProducts(prev => 
        prev.map((p: any) => p.id === productId ? { ...p, cantidad: p.cantidad + 1 } : p)
      );
    } else {
      setSelectedProducts(prev => [...prev, {
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: 1
      }]);
    }
  };

  const updateProductQuantity = (productId: number, cantidad: number) => {
    if (cantidad <= 0) {
      setSelectedProducts(prev => prev.filter(p => p.id !== productId));
    } else {
      setSelectedProducts(prev => 
        prev.map((p: any) => p.id === productId ? { ...p, cantidad } : p)
      );
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {mode === 'create' ? 'Crear Venta' : 'Editar Venta'}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
              disabled={loading}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{errors.general}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cliente */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cliente *
              </label>
              <input
                type="text"
                value={formData.cliente}
                onChange={(e) => setFormData(prev => ({ ...prev, cliente: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.cliente ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Nombre del cliente"
                disabled={loading}
              />
              {errors.cliente && (
                <p className="text-red-600 text-sm mt-1">{errors.cliente}</p>
              )}
            </div>

            {/* Fecha */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha *
              </label>
              <input
                type="date"
                value={formData.fecha}
                onChange={(e) => setFormData(prev => ({ ...prev, fecha: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                  errors.fecha ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              {errors.fecha && (
                <p className="text-red-600 text-sm mt-1">{errors.fecha}</p>
              )}
            </div>
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={formData.estado}
              onChange={(e) => setFormData(prev => ({ ...prev, estado: e.target.value as any }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              disabled={loading}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Completada">Completada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>

          {/* Selección de Productos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agregar Productos *
            </label>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  addProduct(parseInt(e.target.value));
                  e.target.value = '';
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              disabled={loading}
            >
              <option value="">Seleccionar producto para agregar</option>
              {productos.map((product: any) => (
                <option key={product.id} value={product.id}>
                  {product.nombre} - {formatCurrency(product.precio)}
                </option>
              ))}
            </select>
            {errors.productos && (
              <p className="text-red-600 text-sm mt-1">{errors.productos}</p>
            )}
          </div>

          {/* Productos Seleccionados */}
          {selectedProducts.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Productos Seleccionados</h3>
              <div className="space-y-3 max-h-40 overflow-y-auto">
                {selectedProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{product.nombre}</p>
                      <p className="text-sm text-gray-600">{formatCurrency(product.precio)} c/u</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => updateProductQuantity(product.id, product.cantidad - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                        disabled={loading}
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{product.cantidad}</span>
                      <button
                        type="button"
                        onClick={() => updateProductQuantity(product.id, product.cantidad + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                        disabled={loading}
                      >
                        +
                      </button>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="font-bold text-green-600">
                        {formatCurrency(product.precio * product.cantidad)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Total */}
          {selectedProducts.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900">Total de la Venta:</span>
                <span className="text-2xl font-bold text-green-600">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Guardando...
                </div>
              ) : (
                mode === 'create' ? 'Crear Venta' : 'Guardar Cambios'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaleModal; 