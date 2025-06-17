"use client";
import React from 'react';

export type CardProductProps = {
	id: number;
    nombre: string;
    precio: number;
    categoria: string;
}

const CardProduct: React.FC<CardProductProps>  = ({id,nombre,precio,categoria}) => {
	return (
		<div className="card-product grid grid-cols-4 items-center text-black font-semibold rounded-full px-4 py-2 shadow">
  			<p className="text-center">{id}</p>
  			<p className="text-center">{nombre}</p>
  			<p className="text-center">{precio}</p>
  			<p className="text-center">{categoria}</p>
		</div>

	);
};

export default CardProduct;
