"use client";
import React from 'react';
import { ISales } from '@/types';
import CardSales from '@/components/CardSales/CardSales';

export type CardSetSalesProps = {
	sales: ISales[];
	onEdit?: (id: number) => void;
	onDelete?: (id: number) => void;
}

const CardSetSales: React.FC<CardSetSalesProps> = ({ sales, onEdit, onDelete }) => {
	if (!sales || sales.length === 0) {
		return (
			<div className="text-center py-12">
				<div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
					<svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
				</div>
				<h3 className="text-lg font-medium text-gray-900 mb-2">No hay ventas registradas</h3>
				<p className="text-gray-500">Las ventas aparecerán aquí cuando se registren.</p>
			</div>
		);
	}

	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{sales.map((sale) => (
				<CardSales 
					key={sale.id} 
					sale={sale}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			))}
		</div>
	);
};

export default CardSetSales;
