"use client";
import React from 'react';
import { IPurchases } from '@/types';
import CardPurchase from '@/components/CardPurchase/CardPurchase';

export type CardSetPurchaseProps = {
	purchases: IPurchases[];
	onEdit?: (id: number) => void;
	onDelete?: (id: number) => void;
}

const CardSetPurchase: React.FC<CardSetPurchaseProps> = ({ purchases, onEdit, onDelete }) => {
	if (!purchases || purchases.length === 0) {
		return (
			<div className="text-center py-12">
				<div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
					<svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
					</svg>
				</div>
				<h3 className="text-lg font-medium text-gray-900 mb-2">No hay compras registradas</h3>
				<p className="text-gray-500">Las compras aparecerán aquí cuando se registren.</p>
			</div>
		);
	}

	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{purchases.map((purchase) => (
				<CardPurchase 
					key={purchase.id} 
					purchase={purchase}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			))}
		</div>
	);
};

export default CardSetPurchase;
