"use client";
import React, { useState, useEffect } from 'react';
import { IPurchases } from '@/types';
import { useProducts } from '@/hooks/useProducts';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (purchase: any) => Promise<{ success: boolean; error?: string }>;
  purchase?: IPurchases | null;
  mode: 'create' | 'edit';
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  onSave,
  purchase,
  mode
}) => {
  const { productos, loadingProductos, errorProductos } = useProducts();
  const [formData, setFormData] = useState({
    proveedor: '',
    fecha: new Date().toISOString().split('T')[0],
    estado: 'Pendiente' as 'Recibida' | 'Pendiente' | 'Cancelada'
  });
  const [selectedProducts, setSelectedProducts] = useState<Array<{
    id: number;
    nombre: string;
    precio: number;
    cantidad: number;
  }>>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectValue, setSelectValue] = useState('');

  useEffect(() => {
    if (purchase && mode === 'edit') {
      setFormData({
        proveedor: purchase.proveedor || '',
        fecha: purchase.fecha || new Date().toISOString().split('T')[0],
        estado: purchase.estado || 'Pendiente'
      });
      setSelectedProducts(purchase.productos || []);
    } else {
      setFormData({
        proveedor: '',
        fecha: new Date().toISOString().split('T')[0],
        estado: 'Pendiente'
      });
      setSelectedProducts([]);
    }
    setErrors({});
    setShowSuccessMessage(false);
    setSelectValue('');
  }, [purchase, mode, isOpen]);

  const calculateTotal = () => {
    return selectedProducts.reduce((sum, product) => sum + (product.precio * product.cantidad), 0);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.proveedor.trim()) {
      newErrors.proveedor = 'El proveedor es requerido';
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
      const purchaseData = {
        // fecha: formData.fecha, // Quitado porque el backend no lo acepta
        // estado: formData.estado, // Quitado porque el backend no lo acepta
        // productos: selectedProducts, // Quitado porque el backend no lo acepta
        // total: calculateTotal() // Quitado porque el backend no lo acepta
        cantidadProductosCompra: selectedProducts.reduce((sum, product) => sum + product.cantidad, 0),
        producto: parseInt(selectedProducts[0]?.id.toString() || '0', 10) // Convertir a Int
      };

      const result = await onSave(purchaseData);
      
      if (result.success) {
        setShowSuccessMessage(true);
        setTimeout(() => {
          onClose();
          setFormData({
            proveedor: '',
            fecha: new Date().toISOString().split('T')[0],
            estado: 'Pendiente'
          });
          setSelectedProducts([]);
          setShowSuccessMessage(false);
        }, 1500);
      } else {
        setErrors({ general: result.error || 'Error al guardar la compra' });
      }
    } catch (error) {
      setErrors({ general: 'Error inesperado al guardar la compra' });
    } finally {
      setLoading(false);
    }
  };

  const handleProductSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = e.target.value;
    if (productId && productId !== '') {
      const product = productos.find((p: any) => p.id.toString() === productId);
      if (product) {
        const existingProduct = selectedProducts.find(p => p.id === product.id);
        
        if (existingProduct) {
          // Si ya existe, incrementar cantidad
          setSelectedProducts(prev => 
            prev.map(p => p.id === product.id ? { ...p, cantidad: p.cantidad + 1 } : p)
          );
        } else {
          // Si no existe, agregarlo
          const wholesalePrice = product.precio * 0.7;
          setSelectedProducts(prev => [...prev, {
            id: product.id,
            nombre: product.nombre,
            precio: wholesalePrice,
            cantidad: 1
          }]);
        }
        
        // Mostrar mensaje de éxito
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 2000);
      }
    }
    // Resetear el select
    setSelectValue('');
  };

  const updateProductQuantity = (productId: number, cantidad: number) => {
    if (cantidad <= 0) {
      setSelectedProducts(prev => prev.filter(p => p.id !== productId));
    } else {
      setSelectedProducts(prev => 
        prev.map(p => p.id === productId ? { ...p, cantidad } : p)
      );
    }
  };

  const removeProduct = (productId: number) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
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
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              {mode === 'create' ? 'Crear Compra' : 'Editar Compra'}
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

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="bg-green-50 border border-green-200 p-4 m-4 rounded-lg animate-pulse">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-green-800 text-sm font-medium">¡Producto agregado correctamente!</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{errors.general}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Proveedor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proveedor *
              </label>
              <input
                type="text"
                value={formData.proveedor}
                onChange={(e) => setFormData(prev => ({ ...prev, proveedor: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                  errors.proveedor ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Nombre del proveedor"
                disabled={loading}
              />
              {errors.proveedor && (
                <p className="text-red-600 text-sm mt-1">{errors.proveedor}</p>
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
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              disabled={loading}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Recibida">Recibida</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>

          {/* Selección de Productos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agregar Productos *
            </label>
            {loadingProductos ? (
              <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2"></div>
                <span className="text-gray-600">Cargando productos...</span>
              </div>
            ) : errorProductos ? (
              <div className="w-full px-4 py-3 border border-red-300 rounded-lg bg-red-50 flex items-center">
                <svg className="w-4 h-4 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                </svg>
                <span className="text-red-600">Error al cargar productos: {errorProductos.message}</span>
              </div>
            ) : (
              <select
                value={selectValue}
                onChange={handleProductSelect}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all cursor-pointer"
                disabled={loading}
              >
                <option value="">
                  {productos.length === 0 
                    ? 'No hay productos disponibles' 
                    : `Seleccionar producto para agregar (${productos.length} disponibles)`}
                </option>
                {productos.map((product: any) => (
                  <option key={product.id} value={product.id.toString()}>
                    📦 {product.nombre} - {formatCurrency(product.precio * 0.7)} (precio compra)
                  </option>
                ))}
              </select>
            )}
            {errors.productos && (
              <p className="text-red-600 text-sm mt-1">{errors.productos}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              💡 Selecciona un producto del menú desplegable para agregarlo a la compra
            </p>
          </div>

          {/* Productos Seleccionados */}
          {selectedProducts.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <svg className="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Productos Seleccionados ({selectedProducts.length})
              </h3>
              <div className="space-y-3 max-h-40 overflow-y-auto bg-gray-50 p-3 rounded-lg">
                {selectedProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between bg-white rounded-lg p-3 border border-purple-100 shadow-sm">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">📦 {product.nombre}</p>
                      <p className="text-sm text-gray-600">{formatCurrency(product.precio)} c/u (precio compra)</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => updateProductQuantity(product.id, product.cantidad - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                        disabled={loading}
                        title="Disminuir cantidad"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-medium bg-gray-100 rounded px-2 py-1">{product.cantidad}</span>
                      <button
                        type="button"
                        onClick={() => updateProductQuantity(product.id, product.cantidad + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors"
                        disabled={loading}
                        title="Aumentar cantidad"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeProduct(product.id)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors ml-2"
                        disabled={loading}
                        title="Eliminar producto"
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="font-bold text-purple-600">
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
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900">Total de la Compra:</span>
                <span className="text-2xl font-bold text-purple-600">
                  {formatCurrency(calculateTotal())}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {selectedProducts.length} producto{selectedProducts.length !== 1 ? 's' : ''} seleccionado{selectedProducts.length !== 1 ? 's' : ''}
              </p>
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
              className="flex-1 px-4 py-3 text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || selectedProducts.length === 0}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Guardando...
                </div>
              ) : (
                mode === 'create' ? `Crear Compra (${selectedProducts.length} productos)` : 'Guardar Cambios'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseModal; 