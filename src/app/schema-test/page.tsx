"use client";
import React from 'react';
import { useSchemaIntrospection } from '@/hooks/useSchemaIntrospection';

export default function SchemaTest() {
  const { schemaData, loading, error, getTypeFields, hasField, getAllTypes, getTypeInfo } = useSchemaIntrospection();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Schema Introspection Test</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3">Cargando schema...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Schema Introspection Test</h1>
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-700">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const ventaFields = getTypeFields('Venta');
  const compraFields = getTypeFields('Compra');
  const productoFields = getTypeFields('Producto');
  const allTypes = getAllTypes();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Schema Introspection Results</h1>
        
        {/* Tipos disponibles */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Tipos Disponibles</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {allTypes.map((type: any) => (
              <div key={type.name} className="bg-blue-50 p-2 rounded text-sm">
                {type.name}
              </div>
            ))}
          </div>
        </div>

        {/* Campos de Producto */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Campos de Producto</h2>
          {productoFields.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productoFields.map((field: any) => (
                <div key={field.name} className="border p-3 rounded">
                  <div className="font-medium">{field.name}</div>
                  <div className="text-sm text-gray-600">
                    Tipo: {field.type.name || field.type.kind}
                    {field.type.ofType && ` of ${field.type.ofType.name || field.type.ofType.kind}`}
                  </div>
                  {field.description && (
                    <div className="text-xs text-gray-500 mt-1">{field.description}</div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No se encontraron campos para el tipo Producto</p>
          )}
        </div>

        {/* Campos de Venta */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Campos de Venta</h2>
          {ventaFields.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ventaFields.map((field: any) => (
                <div key={field.name} className="border p-3 rounded">
                  <div className="font-medium">{field.name}</div>
                  <div className="text-sm text-gray-600">
                    Tipo: {field.type.name || field.type.kind}
                    {field.type.ofType && ` of ${field.type.ofType.name || field.type.ofType.kind}`}
                  </div>
                  {field.description && (
                    <div className="text-xs text-gray-500 mt-1">{field.description}</div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No se encontraron campos para el tipo Venta</p>
          )}
        </div>

        {/* Campos de Compra */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Campos de Compra</h2>
          {compraFields.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {compraFields.map((field: any) => (
                <div key={field.name} className="border p-3 rounded">
                  <div className="font-medium">{field.name}</div>
                  <div className="text-sm text-gray-600">
                    Tipo: {field.type.name || field.type.kind}
                    {field.type.ofType && ` of ${field.type.ofType.name || field.type.ofType.kind}`}
                  </div>
                  {field.description && (
                    <div className="text-xs text-gray-500 mt-1">{field.description}</div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No se encontraron campos para el tipo Compra</p>
          )}
        </div>

        {/* Schema completo (para debugging) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Schema Completo (JSON)</h2>
          <details>
            <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
              Ver schema completo
            </summary>
            <pre className="mt-4 p-4 bg-gray-100 rounded text-xs overflow-auto max-h-96">
              {JSON.stringify(schemaData, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    </div>
  );
} 