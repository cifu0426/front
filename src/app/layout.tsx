import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout"; // Importa el layout del cliente
import { ApolloProvider } from "@/components/Providers/ApolloProvider";

export const metadata = {
  title: "Pet Manager",
  description: "Manage your pet shop like a pro",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider>
          <ClientLayout>{children}</ClientLayout>
        </ApolloProvider>
      </body>
    </html>
  );
}
