import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout"; // Importa el layout del cliente

export const metadata = {
  title: "Pet Manager",
  description: "Manage your pet shop like a pro",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
