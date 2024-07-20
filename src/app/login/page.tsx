"use client"

import React, { useState, Suspense } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Spinner } from '@components/loader';
import { useRouter } from 'next/navigation';
import { Notify } from '@config/notiflix-config';
import { Email } from '@components/forms/email';

import Navigation from '@components/navigation';
import Cookies from 'js-cookie'
import Config from '@/config';

const LOGIN_MUTATION = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				id
				username
			}
		}
	}
`;

function LoginPage() {
	const router = useRouter()

	const [email, setEmail] = useState('');
	const [isValidEmail, setIsValidEmail] = useState(true);
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (email && password)
			login();
	};

	const toggleLoader = (state: boolean) => {
		const button: HTMLElement | null = document.getElementById("login-button");

		if (button)
			button.classList.toggle("loading", state);
	};

	const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
		variables: {
			email: email.toLowerCase(),
			password: password,
		},
		onCompleted: ({ login }) => {
			Cookies.set('token', login.token, { expires: 1, sameSite: 'none', secure: Config.production() });

			Notify.success(`Welcome back ${login.user.username}!`);
			toggleLoader(false);

			router.push('/notebooks')
		},
		onError: (error) => {
			Notify.failure(`${error.message}!`);
			toggleLoader(false);
		}
	});

	if (loading)
		toggleLoader(true);

	if (typeof window !== 'undefined' && document.cookie.includes('token')) {
		return <></>;
	}

	return (
		<div className="flex flex-col h-screen">
			<Navigation />

			<div className="flex-1 p-5">
				<div className="flex justify-center h-full">
					<form className="w-[350px]" onSubmit={onSubmit}>
						<div className="text-center mt-20">
							<h1 className="text-5xl"><b>LOG</b> IN</h1>
						</div>

						<div className="my-20">
							<Email
								email={email}
								setEmail={setEmail}
								isValidEmail={isValidEmail}
								setIsValidEmail={setIsValidEmail}
							/>
							<div className="my-5">
								<div className="flex justify-end items-center relative">
									<input
										className="input w-full"
										type={showPassword ? 'text' : 'password'}
										placeholder="Password"
										value={password}
										onChange={onPasswordChange}
										required={true}
									/>
									<div className="input-group">
										<button className="svg" onClick={toggleShowPassword} type="button">
											<img className="w-8" src={showPassword ? "/eye.svg" : "/eye-slash.svg"} />
										</button>
									</div>
								</div>

								<div className="m-2">
									<a href="/reset-password">Forgot Password?</a>
								</div>
							</div>
						</div>

						<button id="login-button" className="button !bg-accent !text-white float-right" type="submit">
							<span className="spinner"><Spinner /></span>
							<span className="label">Login</span>
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

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <LoginPage />
    </Suspense>
  );
}
