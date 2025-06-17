"use client";
import React from 'react';
import CardUser from '../CardUser/CardUser';
import { IUser } from '@/types';

export type CardSetUserProps = {
	users: IUser[];
};

const CardSetUser: React.FC<CardSetUserProps> = ({ users }) => {
	return (
		<div className="card-set-users text-black container mx-auto grid gap-[4px] bg-white p-4 rounded-2xl shadow-md">
			{/* Cabecera */}
			<div className="grid grid-cols-4 bg-sky-100 py-2 rounded-full font-bold text-center">
				<p>Name</p>
				<p>Email</p>
				<p>Role</p>
				<p>Eliminar</p>
			</div>

			{/* Lista de usuarios */}
			{users.map((user) => (
				<CardUser
					key={user.id}
					id={user.id}
					nombreusuario={user.nombreusuario}
					rol={user.rol}
				/>
			))}
		</div>
	);
};

export default CardSetUser;
