"use client"

import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Spinner } from '@components/loader';
import { Email } from '@/components/forms/email';
import { Password } from '@/components/forms/password';
import { Username } from '@/components/forms/username';
import Navigation from '@/components/navigation';
import { useRouter } from 'next/navigation'
import { Notify } from '@config/notiflix-config';

const REGISTER_MUTATION = gql`
	mutation Register($email: String!, $password: String!, $username: String!) {
		register(email: $email, password: $password, username: $username) {
			id
			email
			username
		}
	}
`;

export default function Page() {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [username, setUsername] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const validateForm = () => {
		let isValid = true;

		if (!username || !email || !password || password !== confirmPassword || isValidEmail === false) {
			isValid = false;
		}

		return isValid;
	};

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (validateForm()) {
			register();
		}
	};

	const toggleLoader = (state: boolean) => {
		const button: HTMLElement | null = document.getElementById("signin-button");

		if (button)
			button.classList.toggle("loading", state);
	};

	const [register, { loading: registerLoading, error: registerError }] = useMutation(REGISTER_MUTATION, {
		variables: {
			email: email,
			password: confirmPassword,
			username: username,
		},
		onCompleted: () => {
			toggleLoader(false);
			Notify.success(`Thanks for register. You will receive a confirmation email soon!`);
			router.push('/login')
		},
		onError: (error) => {
			toggleLoader(false);
			Notify.failure(`${error.message}!`);
			setErrorMsg(error.message);
		}
	});

	if (registerLoading) {
		toggleLoader(true);
	}
	if (registerError) {
		toggleLoader(false);
		errorMsg;
	}

	return (
		<div className="flex flex-col h-screen">
			<Navigation />

			<div className="flex-1 p-5">
				<div className="flex justify-center h-full">
					<form className="w-[400px]" onSubmit={onSubmit}>
						<div className="text-center mt-20">
							<h1 className="text-5xl"><b>SIGN</b> IN</h1>
						</div>

						<div className="my-8">
							<Username
								username={username}
								setUsername={setUsername}
							/>
							<Email
								email={email}
								setEmail={setEmail}
								isValidEmail={isValidEmail}
								setIsValidEmail={setIsValidEmail}
							/>
							<Password
								password={password}
								setPassword={setPassword}
								confirmPassword={confirmPassword}
								setConfirmPassword={setConfirmPassword}
							/>

							<span className='text-sm'>By creating an account, you agree to Cursif <a href="#" className="underline text-blue-400">Terms & Conditions</a>.</span>
						</div>

						<button id="signin-button" className="button !bg-accent !text-white float-right" type="submit">
							<span className="spinner"><Spinner /></span>
							<span className="label">Sign in</span>
						</button>
					</form>
				</div>
			</div>

			<div className="flex justify-center text-center p-5">
				<span>Made by the <a className="font-bold hover:underline" href="https://codesociety.xyz/">Code Society</a></span>
			</div>
		</div>
	);
}