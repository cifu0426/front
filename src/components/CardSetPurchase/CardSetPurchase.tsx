"use client";
import React from 'react';
import CardPurchase from '../CardSales/CardSales';
import { IPurchases } from '@/types';

export type CardSetPurchaseProps = {
	purchases: IPurchases[];
}

const CardSetPurchase: React.FC<CardSetPurchaseProps>  = ({ purchases }) => {
	return (
		<div className="card-set-puchase text-black container mx-auto grid gap-[3px]">
			{purchases.map((purchase) => (
			<CardPurchase
				key={purchase.id}
				id={purchase.id}
				fecha={purchase.fecha}
				total={purchase.total}
				productos={purchase.productos}
			/>
			))}
		</div>
	);
};

export default CardSetPurchase;
