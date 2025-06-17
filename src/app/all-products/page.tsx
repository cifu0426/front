"use client";
import { CardSetProducts } from "@/components/CardSetProducts";
import { useProducts } from '@/hooks/useProducts';

export default function Home() {
  const { productos, loadingProductos, errorProductos } = useProducts();

  if (loadingProductos) {
    return (
      <main className="gap-[3px]">
        <div className="flex flex-col items-center bg-sky-200 min-h-screen pt-10">
          <h1 className="text-3xl font-bold text-blue-900 mb-6 flex items-center">
            <span className="text-4xl mr-2">🐾</span> ALL PRODUCTS
          </h1>
          <div className="bg-sky-100 rounded-xl p-6 shadow-md border border-blue-500 w-full max-w-4xl">
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
              <span className="ml-4 text-blue-900">Cargando productos...</span>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (errorProductos) {
    return (
      <main className="gap-[3px]">
        <div className="flex flex-col items-center bg-sky-200 min-h-screen pt-10">
          <h1 className="text-3xl font-bold text-blue-900 mb-6 flex items-center">
            <span className="text-4xl mr-2">🐾</span> ALL PRODUCTS
          </h1>
          <div className="bg-sky-100 rounded-xl p-6 shadow-md border border-blue-500 w-full max-w-4xl">
            <div className="flex justify-center items-center h-32">
              <div className="text-red-600">
                <p className="text-xl font-semibold">Error al cargar productos</p>
                <p className="text-sm mt-2">{errorProductos.message}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="gap-[3px]">
      <div className="flex flex-col items-center bg-sky-200 min-h-screen pt-10">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 flex items-center">
          <span className="text-4xl mr-2">🐾</span> ALL PRODUCTS
        </h1>

        <div className="bg-sky-100 rounded-xl p-6 shadow-md border border-blue-500 w-full max-w-4xl">
          <div className="card-product grid grid-cols-4 items-center bg-sky-200 text-black font-semibold rounded-full px-4 py-2 shadow mb-1">
            <p className="text-center">id</p>
            <p className="text-center">name</p>
            <p className="text-center">price</p>
            <p className="text-center">category</p>
          </div>
        
          <div>
            <CardSetProducts productos={productos}/>
          </div>
        </div>
      </div>
    </main>
  );
}
