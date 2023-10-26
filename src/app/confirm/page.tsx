"use client"

import { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Spinner } from '@components/loader';
import { useRouter, useSearchParams } from 'next/navigation';
import Notify from '@config/notiflix-config';

const CONFIRM_EMAIL_MUTATION = gql`
  mutation Confirm($token: String!) {
    confirm(token: $token) {
        email
        firstName
        id
        lastName
        username
    }
  }
`;

export default function Page() {
  // Retrieve the token from the URL query parameter.
  const searchParams = useSearchParams()
  const token  = searchParams.get("token");
  const router = useRouter();

  // Extract the token from the URL query parameter.
  const [confirm_email, { data, loading, error }] = useMutation(CONFIRM_EMAIL_MUTATION, {
    variables: {
      token: token
    },
    onCompleted: (data) => {
      Notify.success(`Email Address Confirmed Successfully!`);
      router.push('/login');
    },
    onError: (error) => {
      console.log('onError error:', error);
      Notify.failure(`${error.message}!`);
    }    
  });

  useEffect(() => {
    confirm_email();
  }, []);

  if (loading) {
    return <Spinner />; 
  }

  return true;
}
