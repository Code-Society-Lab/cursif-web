"use client"

import { usePathname } from 'next/navigation';
import { useAuth } from '@components/auth-provider';

export default function Navigation() {
	const pathname = usePathname();
	const { user } = useAuth();

	const actions: any[] = [];

	const showLoginAction = !user && pathname !== '/login';
	const showSignupAction = !user && pathname !== '/signup';
	const showLogoutAction = user && pathname !== '/logout';

	if (showLoginAction) {
		actions.push({ href: '/login', label: 'Log In', isButton: false });
	} else if (showSignupAction) {
		actions.push({ href: '/signup', label: 'Sign Up', isButton: true });
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