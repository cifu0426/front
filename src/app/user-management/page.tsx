// app/admin/users/page.tsx
"use client";

import { useEffect, useState } from "react";
import CardSetUser from "@/components/CardSetUser/CardSetUser";
import { IUser } from "@/types";

export default function UsersPage() {
	const [users, setUsers] = useState<IUser[]>([]);

	useEffect(() => {
		fetch("https://backend-petstore-2.onrender.com/graphql", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `
          query {
            getUsuarios {
              id
              nombreusuario
              rol
            }
          }
        `,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setUsers(data.data.getUsuarios);
			});
	}, []);

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold text-sky-900 flex items-center gap-2 mb-6">
				<span>🐾</span> SYSTEM USERS
			</h1>
			<CardSetUser users={users} />
		</div>
	);
}
