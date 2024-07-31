"use client"

import React from 'react';
import CommandPalette from '@/components/command-palette';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <CommandPalette />
      {children}
    </>
  );
}