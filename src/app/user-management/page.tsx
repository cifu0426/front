// app/admin/users/page.tsx
"use client";

import CardSetUser from "@/components/CardSetUser/CardSetUser";
import { useUsers } from '@/hooks/useUsers';

export default function UsersPage() {
	const { usuarios, loadingUsuarios, errorUsuarios } = useUsers();

	if (loadingUsuarios) {
		return (
			<div className="p-6">
				<h1 className="text-3xl font-bold text-sky-900 flex items-center gap-2 mb-6">
					<span>🐾</span> SYSTEM USERS
				</h1>
				<div className="flex justify-center items-center h-32">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-900"></div>
					<span className="ml-4 text-sky-900">Cargando usuarios...</span>
				</div>
			</div>
		);
	}

	if (errorUsuarios) {
		return (
			<div className="p-6">
				<h1 className="text-3xl font-bold text-sky-900 flex items-center gap-2 mb-6">
					<span>🐾</span> SYSTEM USERS
				</h1>
				<div className="flex justify-center items-center h-32">
					<div className="text-red-600">
						<p className="text-xl font-semibold">Error al cargar usuarios</p>
						<p className="text-sm mt-2">{errorUsuarios.message}</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold text-sky-900 flex items-center gap-2 mb-6">
				<span>🐾</span> SYSTEM USERS
			</h1>
			<CardSetUser users={usuarios} />
		</div>
	);
}
