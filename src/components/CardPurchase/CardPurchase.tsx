"use client";
import React from 'react';
import styles from './CardPurchase.module.scss';
import { IProduct } from '@/types';

export type CardPurchaseProps = {
	id: number;
    fecha: string;
    total: number;
    productos: IProduct[];
}

const CardPurchase: React.FC<CardPurchaseProps>  = ({ id, fecha, total, productos }) => {
	return (
		<div className="">
			<div className="card-product grid grid-cols-5 items-center text-black font-semibold rounded-full px-4 py-2 shadow">
				<p className="text-center">{id}</p>
				<p className="text-center">{fecha}</p>
				<p className="text-center">{total}</p>
				<p className="text-center">{productos.length}</p>
				<p className="text-center cursor-pointer" onClick={() => setOpen(true)}>i</p>
			</div>
		</div>
	);
};

export default CardPurchase;
