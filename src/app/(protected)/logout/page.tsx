"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Notify } from 'notiflix';

import Cookies from 'js-cookie';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    Notify.info('You have been logged out!');

    Cookies.remove('token');
    router.push('/login');
  }, []);

  return null;
}