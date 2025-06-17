"use client";
import React from 'react';
import CardProduct from '../CardProduct/CardProduct';
import { IProduct } from '@/types';

export type CardSetProductsProps = {
	productos: IProduct[];
}

const CardSetProducts: React.FC<CardSetProductsProps>  = ({productos}) => {
	return (
		<div className="card-set-products text-black container mx-auto grid gap-[3px]">
			{productos.map((CardProducto) => (
			<CardProduct
				key={CardProducto.id}
				id={CardProducto.id}
				nombre={CardProducto.nombre}
				precio={CardProducto.precio}
				stock={CardProducto.stock}
				categoria={CardProducto.categoria}
			/>
			))}
 		</div>
	);
};

export default CardSetProducts;
