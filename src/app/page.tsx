"use client";
import { Login } from "@/components/Login";
import { Logo } from "@/components/Logo";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-white">
      <Logo /> 
      <Login />
    </main>
  );
}
