import { usePathname } from 'next/navigation';

export default function Navigation() {
	const pathname = usePathname()

	var showLoginAction = !localStorage.token && pathname != '/login'
	var showSigninAction = !localStorage.token && pathname != '/signin'

	const actions = []

	if (localStorage.token) {
		// Add authenticated actions
	} else {
		actions.push({"href": "/login", "label": "Log In", "isButton": false})
		actions.push({"href": "/signin", "label": "Sign In", "isButton": true})
	}

	return (
		<div className="grid grid-cols-2 p-5">
			<div className="flex">
				<a href="/" className="text-5xl font-montez">Cursif</a>
			</div>
			<div className="flex items-center justify-end">
				{ 
					actions.map(({href, label, isButton}) => {
						if (pathname != href)
							return <a key={href} href={href} className={isButton ? "button" : "mx-6"}><span className="label">{label}</span></a>
					}) 
				}
			</div>
		</div>
	);
}