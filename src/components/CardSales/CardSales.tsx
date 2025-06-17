"use client";
import React from 'react';
import { ISales } from '@/types';

export type CardSalesProps = {
	sale: ISales;
	onEdit?: (id: number) => void;
	onDelete?: (id: number) => void;
}

const CardSales: React.FC<CardSalesProps> = ({ sale, onEdit, onDelete }) => {
	const getEstadoColor = (estado: string) => {
		switch (estado) {
			case 'Completada':
				return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
			case 'Pendiente':
				return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white';
			case 'Cancelada':
				return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
			default:
				return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('es-ES', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('es-ES', {
			style: 'currency',
			currency: 'EUR'
		}).format(amount);
	};

	return (
		<div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
			{/* Header con gradiente */}
			<div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
				<div className="flex justify-between items-start">
					<div className="flex items-center space-x-3">
						<div className="bg-white/20 rounded-full p-2">
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
						</div>
						<div>
							<h3 className="text-xl font-bold">Venta #{sale.id}</h3>
							<p className="text-blue-100 text-sm">{sale.fecha && formatDate(sale.fecha)}</p>
						</div>
					</div>
					<div className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${getEstadoColor(sale.estado || 'Completada')}`}>
						{sale.estado}
					</div>
				</div>
			</div>

			{/* Contenido principal */}
			<div className="p-6">
				{/* Cliente */}
				<div className="mb-6">
					<div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-4">
						<div className="bg-blue-100 rounded-full p-2">
							<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
						</div>
						<div>
							<p className="text-sm text-gray-500 font-medium">Cliente</p>
							<p className="text-lg font-semibold text-gray-900">{sale.cliente}</p>
						</div>
					</div>
				</div>

				{/* Productos */}
				{sale.productos && sale.productos.length > 0 && (
					<div className="mb-6">
						<h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
							<svg className="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
							</svg>
							Productos ({sale.productos.length})
						</h4>
						<div className="space-y-3">
							{sale.productos.map((producto, index) => (
								<div key={index} className="flex justify-between items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 border-l-4 border-purple-400">
									<div className="flex-1">
										<span className="font-semibold text-gray-900">{producto.nombre}</span>
										<div className="flex items-center mt-1">
											<span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
												{producto.cantidad} unidades
											</span>
											<span className="text-xs text-gray-500 ml-2">
												{formatCurrency(producto.precio)} c/u
											</span>
										</div>
									</div>
									<div className="text-right">
										<span className="font-bold text-lg text-green-600">
											{formatCurrency(producto.precio * producto.cantidad)}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Total y Acciones */}
				<div className="border-t border-gray-200 pt-4">
					<div className="flex justify-between items-center mb-4">
						<div className="text-left">
							<p className="text-sm text-gray-500 font-medium">Total de la Venta</p>
							<p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
								{sale.total ? formatCurrency(sale.total) : 'N/A'}
							</p>
						</div>
						
						<div className="flex space-x-3">
							{onEdit && (
								<button
									onClick={() => onEdit(sale.id)}
									className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
								>
									<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
									</svg>
									Editar
								</button>
							)}
							{onDelete && (
								<button
									onClick={() => onDelete(sale.id)}
									className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
								>
									<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
									</svg>
									Eliminar
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardSales;

