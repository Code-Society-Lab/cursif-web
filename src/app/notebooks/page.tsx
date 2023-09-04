"use client"

import React from 'react';
import Loader from '@components/loader';
import { useState, Suspense, useTransition } from 'react';
import { useQuery, gql, useSuspenseQuery } from '@apollo/client';

const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      email
      firstName
      lastName
    }
  }
`;

export default function Page() {
  const { data, loading, error } = useQuery(GET_ME);

  if (loading)
    return <Loader />;

  if (error) 
    return null;

  return (
    <div>
      <span>USERNAME: {data.me.username}</span>
    </div>
  );
}