'use client';

import { ReactNode } from 'react';
import Navbar from './Navbar/Navbar';

interface ClientLayoutProps {
  children: ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
} 