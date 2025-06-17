"use client";

import { ApolloProvider } from '@apollo/client';
import apolloClient from '@/lib/apolloClient';

interface ApolloProviderWrapperProps {
  children: React.ReactNode;
}

export default function ApolloProviderWrapper({ children }: ApolloProviderWrapperProps) {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );
} 