import React, { Suspense } from 'react';
import { Spinner } from '@components/loader';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<Suspense fallback={<Spinner />}>
			{children}
		</Suspense>
	);
}