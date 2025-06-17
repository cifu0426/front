import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClientLayout } from "@/components/ClientLayout";
import { ApolloProvider } from "@/components/Providers/ApolloProvider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sistema de Compras',
  description: 'Sistema de gestión de compras y productos'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ApolloProvider>
          <ClientLayout>{children}</ClientLayout>
        </ApolloProvider>
      </body>
    </html>
  );
}
