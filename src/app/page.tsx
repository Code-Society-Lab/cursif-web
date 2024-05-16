"use client"

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Loader } from '@/components/loader';

export default function Page() {
  const router   = useRouter();
  const pathname = usePathname();

  if (pathname === '/') {
    router.replace('/login');
  }

  return (
    <Loader />
  );
}
