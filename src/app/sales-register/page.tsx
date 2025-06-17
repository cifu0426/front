"use client";
import React from 'react';
import CardSetSales from '@/components/CardSetSales/CardSetSales';

export default function Home() {

    const cardsSales = [
        {
            id: 1,
            fecha: "2023-10-01",
            total: 300,
            productos: [
                {
                    id: 1,
                    nombre: "Producto 1",
                    precio: 100,
                    stock: 10,
                    categoria: "Categoria A"
                },
                {
                    id: 2,
                    nombre: "Producto 2",
                    precio: 200,
                    stock: 5,
                    categoria: "Categoria B"
                }
            ]
        },
        {
            id: 2,
            fecha: "2023-10-01",
            total: 300,
            productos: [
                {
                    id: 1,
                    nombre: "Producto 1",
                    precio: 100,
                    stock: 10,
                    categoria: "Categoria A"
                },
                {
                    id: 2,
                    nombre: "Producto 2",
                    precio: 200,
                    stock: 5,
                    categoria: "Categoria B"
                }
            ]
        },
        {
            id: 3,
            fecha: "2023-10-01",
            total: 300,
            productos: [
                {
                    id: 1,
                    nombre: "Producto 1",
                    precio: 100,
                    stock: 10,
                    categoria: "Categoria A"
                },
                {
                    id: 2,
                    nombre: "Producto 2",
                    precio: 200,
                    stock: 5,
                    categoria: "Categoria B"
                }
            ]
        }

    ]

  return (
    <main className="gap-[3px]">
      <div className="flex flex-col items-center bg-sky-200 min-h-screen pt-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 flex items-center">
          <span className="text-4xl mr-2">🐾</span> SALES REGISTER
        </h1>

        <div className="bg-sky-100 rounded-xl p-6 shadow-md border border-blue-500 w-full max-w-4xl">

          <div className="card-sales grid grid-cols-5 items-center bg-sky-200 text-black font-semibold rounded-full px-4 py-2 shadow mb-1">
  			    <p className="text-center">id</p>
  			    <p className="text-center">date</p>
  			    <p className="text-center">total</p>
  			    <p className="text-center">num products</p>
  			    <p className="text-center">info</p>
		      </div>
        
          <div>
            <CardSetSales sales={cardsSales}/>
          </div>

        </div>
      </div>
       
    </main>
  );
}
