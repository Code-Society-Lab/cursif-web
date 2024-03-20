"use client"

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navigation() {
	const pathname = usePathname();
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		setToken(storedToken);
	}, []);

	const actions: any[] = [];

	const showLoginAction = !token && pathname !== '/login';
	const showSigninAction = !token && pathname !== '/signin';
	const showLogoutAction = token && pathname !== '/logout';

	if (showLoginAction) {
		actions.push({ href: '/login', label: 'Log In', isButton: false });
	} else if (showSigninAction) {
		actions.push({ href: '/signin', label: 'Sign In', isButton: true });
	} else if (showLogoutAction) {
		actions.push({ href: '/logout', label: 'Log Out', isButton: true });
	}

	return (
		<div className="grid grid-cols-2 p-5">
			<div className="flex">
				<a href="/" className="text-5xl font-montez">Cursif</a>
			</div>
			<div className="flex items-center justify-end">
				{
					actions.map(({ href, label, isButton }: { href: string, label: string, isButton: boolean }) => {
						if (pathname != href)
							return <a key={href} href={href} className={isButton ? "button" : "mx-6"}><span className="label">{label}</span></a>
					})
				}
			</div>
		</div>
	);
}