"use client"

import React from 'react';
import { useAuth } from '@components/auth-provider';

export default function Page(): JSX.Element {
  const { user } = useAuth();

  return (
    <div>
      <div>USERNAME: {user?.username}</div>
    </div>
  );
}