"use client"

import React from 'react';
import Loader from '@components/loader';
import { useState, Suspense, useTransition } from 'react';
import { useQuery, gql, useSuspenseQuery } from '@apollo/client';
import { useAuth } from '@components/auth-provider';

export default function Page() {
  const { user } = useAuth();

  return (
    <div>
      <div>USERNAME: {user?.username}</div>
    </div>
  );
}