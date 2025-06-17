"use client";
import { CardSetProducts } from "@/components/CardSetProducts";

export default function Home() {

    const cardsProducts = [
        {
            id: 1,
            nombre: "Producto 1",
            precio: 100,
            stock: 10,
            categoria: "Categoria A"
        },
        {
            id: 2,
            nombre: "Producto 1",
            precio: 100,
            stock: 10,
            categoria: "Categoria A"
        },

    ]

  return (
    <main className="gap-[3px]">
      <div className="flex flex-col items-center bg-sky-200 min-h-screen pt-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 flex items-center">
          <span className="text-4xl mr-2">🐾</span> ALL PRODUCTS
        </h1>

        <div className="bg-sky-100 rounded-xl p-6 shadow-md border border-blue-500 w-full max-w-4xl">

          <div className="card-product grid grid-cols-5 items-center bg-sky-200 text-black font-semibold rounded-full px-4 py-2 shadow mb-1">
  			    <p className="text-center">id</p>
  			    <p className="text-center">name</p>
  			    <p className="text-center">price</p>
  			    <p className="text-center">stock</p>
  			    <p className="text-center">category</p>
		      </div>
        
          <div>
            <CardSetProducts productos={cardsProducts}/>
          </div>

        </div>
      </div>
       
    </main>
  );
}
