"use client"

import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="h-screen flex flex-col">
        <main className="flex-1 bg-sky-200 flex items-center justify-center"> {/* Contenido principal */}
          <div className="flex flex-col items-center">
            <Image
              src="/logo.png"
              alt="Pet Manager Logo"
              width={300}
              height={300}
              className="object-contain"
              priority
            />
            <h2 className="text-3xl font-bold text-blue-900 mt-4">PET MANAGER</h2>
          </div>
        </main>
    </div>
  );
}
