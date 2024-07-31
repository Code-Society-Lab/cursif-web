import { usePathname } from 'next/navigation';
import { useAuth } from '@components/auth-provider';
import { ProfileDropdownMenu } from '@components/profile';

function BaseNavigation({ children, actions }: { children?: React.ReactNode, actions?: Object[] }) {
	const pathname = usePathname();

	return (
		<div className="grid grid-cols-2 p-5">
			<div className="flex">
				<a href="/" className="text-5xl font-montez">Cursif</a>
			</div>

			<div className="flex items-center justify-end">
				{
					actions?.map(({ href, label, isButton }: any) => (
						pathname !== href && (
							<a key={href} href={href} className={isButton ? "button" : "mx-6"}>
								<span className="label">{label}</span>
							</a>
						)
					))
				}

				{children}
			</div>
		</div>	
	);
}

export function AnonymousNavigation() {
	const actions: Object[]			= [];
	const pathname: string			= usePathname();
	const showLoginAction: boolean  = pathname !== '/login';
	const showSigninAction: boolean = pathname !== '/signup';

	if (showLoginAction) {
		actions.push({ href: '/login', label: 'Log In', isButton: false });
	} else if (showSigninAction) {
		actions.push({ href: '/signup', label: 'Sign Up', isButton: true });
	}

	return <BaseNavigation actions={actions} />;
}

export function UserNavigation() {
	const { user } = useAuth();

	if (!user) {
		return <AnonymousNavigation />;
	}

	return (
		<BaseNavigation>
			<ProfileDropdownMenu user={user} />
		</BaseNavigation>
	);
}
