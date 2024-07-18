"use client"

import { usePathname } from 'next/navigation';
import { useAuth } from '@components/auth-provider';
import SettingsDropdown from '@components/settings';

export default function Navigation() {
	const pathname = usePathname();
	const { user } = useAuth();

	const actions: any[] = [];

	const showLoginAction = !user && pathname !== '/login';
	const showSigninAction = !user && pathname !== '/signin';

	if (showLoginAction) {
		actions.push({ href: '/login', label: 'Log In', isButton: false });
	} else if (showSigninAction) {
		actions.push({ href: '/signin', label: 'Sign In', isButton: true });
	}

	return (
		<div className="grid grid-cols-2 p-5">
			<div className="flex">
				<a href="/" className="text-5xl font-montez">Cursif</a>
			</div>
			<div className="flex items-center justify-end">
				{
					actions.map(({ href, label, isButton }: { href: string, label: string, isButton: boolean }) => (
						pathname !== href && (
							<a key={href} href={href} className={isButton ? "button" : "mx-6"}>
								<span className="label">{label}</span>
							</a>
						)
					))
				}
				{!showLoginAction && !showSigninAction && user && (
					<SettingsDropdown user={user} />
				)}
			</div>
		</div>
	);
}
