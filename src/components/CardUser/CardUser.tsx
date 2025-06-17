"use client";
import React from 'react';

export type CardUserProps = {
	id: number;
	nombreusuario: string;
	rol: {
		id: number;
		nombre: string;
	};
};

const CardUser: React.FC<CardUserProps> = ({ id, nombreusuario, rol }) => {
	return (
		<div className="card-user grid grid-cols-4 items-center text-black font-semibold rounded-full px-4 py-2 shadow">
			<p className="text-center">{id}</p>
			<p className="text-center">{nombreusuario}</p>
			<p className="text-center">{rol.nombre}</p>
			<p className="text-center text-red-500 cursor-pointer hover:underline">Eliminar</p>
		</div>
	);
};

export default CardUser;
