"use client";
import React, { useState, useEffect } from 'react';
import { IProduct } from '@/types';
import { FaTimes } from 'react-icons/fa';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: any) => Promise<{ success: boolean; error?: string }>;
  product?: IProduct | null;
  mode: 'create' | 'edit';
}

export default function ProductModal({ isOpen, onClose, onSave, product, mode }: ProductModalProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    descripcion: '',
    cantidadDisponible: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (product && mode === 'edit') {
      setFormData({
        nombre: product.nombre,
        precio: product.precio.toString(),
        categoria: product.categoria,
        descripcion: product.descripcion || '',
        cantidadDisponible: product.cantidadDisponible.toString()
      });
    } else {
      setFormData({
        nombre: '',
        precio: '',
        categoria: '',
        descripcion: '',
        cantidadDisponible: ''
      });
    }
    setErrors({});
    setSuccessMessage('');
  }, [product, mode]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    
    const precioValue = formData.precio.replace(/[^0-9.]/g, '');
    if (!precioValue) {
      newErrors.precio = 'El precio es requerido';
    } else if (isNaN(Number(precioValue)) || Number(precioValue) <= 0) {
      newErrors.precio = 'El precio debe ser un número mayor a 0';
    }

    if (!formData.categoria.trim()) {
      newErrors.categoria = 'La categoría es requerida';
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
    }

    const cantidadValue = formData.cantidadDisponible.replace(/[^0-9]/g, '');
    if (!cantidadValue) {
      newErrors.cantidadDisponible = 'La cantidad disponible es requerida';
    } else if (isNaN(Number(cantidadValue)) || Number(cantidadValue) < 0) {
      newErrors.cantidadDisponible = 'La cantidad debe ser un número mayor o igual a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const precioValue = formData.precio.replace(/[^0-9.]/g, '');
      const cantidadValue = formData.cantidadDisponible.replace(/[^0-9]/g, '');
      const result = await onSave({
        nombre: formData.nombre,
        precio: Number(precioValue),
        categoria: formData.categoria,
        descripcion: formData.descripcion,
        cantidadDisponible: Number(cantidadValue)
      });

      if (result.success) {
        setSuccessMessage(mode === 'create' ? 'Producto creado exitosamente' : 'Producto actualizado exitosamente');
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setErrors({ submit: result.error || 'Error al guardar el producto' });
      }
    } catch (error) {
      setErrors({ submit: 'Error al guardar el producto' });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: string) => {
    const number = value.replace(/[^0-9.]/g, '');
    if (number === '') return '';
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(Number(number));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {mode === 'create' ? 'Nuevo Producto' : 'Editar Producto'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        {successMessage && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.nombre ? 'border-red-500' : ''
              }`}
            />
            {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Precio</label>
            <input
              type="text"
              value={formData.precio}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, '');
                setFormData({ ...formData, precio: value });
              }}
              onBlur={(e) => {
                const formatted = formatCurrency(e.target.value);
                setFormData({ ...formData, precio: formatted });
              }}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.precio ? 'border-red-500' : ''
              }`}
            />
            {errors.precio && <p className="mt-1 text-sm text-red-600">{errors.precio}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <input
              type="text"
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.categoria ? 'border-red-500' : ''
              }`}
            />
            {errors.categoria && <p className="mt-1 text-sm text-red-600">{errors.categoria}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.descripcion ? 'border-red-500' : ''
              }`}
              rows={3}
            />
            {errors.descripcion && <p className="mt-1 text-sm text-red-600">{errors.descripcion}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cantidad Disponible</label>
            <input
              type="text"
              value={formData.cantidadDisponible}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setFormData({ ...formData, cantidadDisponible: value });
              }}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                errors.cantidadDisponible ? 'border-red-500' : ''
              }`}
            />
            {errors.cantidadDisponible && <p className="mt-1 text-sm text-red-600">{errors.cantidadDisponible}</p>}
          </div>

          {errors.submit && (
            <div className="p-2 bg-red-100 text-red-700 rounded">{errors.submit}</div>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Guardando...' : mode === 'create' ? 'Crear' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 