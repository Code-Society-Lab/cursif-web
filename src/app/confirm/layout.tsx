import React, { Suspense } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<Suspense>
	    {children}
		</Suspense>
	);
}