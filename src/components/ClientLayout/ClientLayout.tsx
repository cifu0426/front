"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayoutRoutes = ["/", "/register"];
  const shouldShowLayout = !hideLayoutRoutes.includes(pathname);

  if (!shouldShowLayout) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar en la parte superior */}
      <Navbar />

      <div className="flex flex-1 bg-sky-200">
        {/* Sidebar fijo a la izquierda */}
        <Sidebar />

        {/* Contenido principal */}
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
