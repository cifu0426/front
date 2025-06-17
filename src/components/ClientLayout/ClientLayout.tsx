"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayoutRoutes = ["/", "/register"];
  const shouldShowLayout = !hideLayoutRoutes.includes(pathname);

  return (
    <div className="flex bg-sky-200 min-h-screen">
      {shouldShowLayout && <Sidebar />}
      <div className="flex-1">
        {shouldShowLayout && <Navbar />}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
