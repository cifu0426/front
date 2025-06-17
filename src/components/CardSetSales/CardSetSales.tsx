"use client";
import React from 'react';
import CardSales from '../CardSales/CardSales';
import { ISales } from '@/types';

export type CardSetSalesProps = {
	sales: ISales[];
}

const CardSetSales: React.FC<CardSetSalesProps>  = ({sales}) => {
	return (
 		<div className="card-set-sales text-black container mx-auto grid gap-[3px]">
			{sales.map((sale) => (
			<CardSales
				key={sale.id}
				id={sale.id}
				fecha={sale.fecha}
				total={sale.total}
				productos={sale.productos}
			/>
			))}
 		</div>
	);
};

export default CardSetSales;
