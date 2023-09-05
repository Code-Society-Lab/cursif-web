"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Notify } from 'notiflix';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    Notify.info('You have been logged out!');

    localStorage.removeItem('token');
    router.push('/login');
  }, []);

  return null;
}