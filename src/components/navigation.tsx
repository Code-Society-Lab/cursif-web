"use client"

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Navigation() {
	const pathname = usePathname()

	const actions: any = []

	useEffect(() => {
		var showLoginAction = !localStorage.token && pathname != '/login'
		var showSigninAction = !localStorage.token && pathname != '/signin'
		var showLogoutAction = localStorage.token && pathname != '/logout'

		if (localStorage.token) {
			// Add authenticated actions
			actions.push({ "href": "/logout", "label": "Log Out", "isButton": true })
		} else {
			actions.push({ "href": "/login", "label": "Log In", "isButton": false })
			actions.push({ "href": "/signin", "label": "Sign In", "isButton": true })
		}
	}
		, [pathname])


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