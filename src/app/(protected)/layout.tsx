"use client"

import React from 'react';

import { AuthProvider } from '@components/auth-provider';
import { MenuProvider, Dimensions } from 'kmenu'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const dimensions: Dimensions = {}

  return (
    <AuthProvider>
      <MenuProvider dimensions={dimensions}>
        {children}
      </MenuProvider>
    </AuthProvider>
  );
}