"use client"

import { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Spinner } from '@components/loader';
import { useRouter } from 'next/navigation'
import Navigation from '@components/navigation'
import { Notify, useNotify } from '@config/notiflix-config';

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

export default function Page() {
	useNotify();
	const router = useRouter()

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
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
			email: email,
			password: password,
		},
		onCompleted: ({ login }) => {
			localStorage.setItem('token', login.token);

			toggleLoader(false);
			Notify.success(`Welcome back ${login.user.username}!`);
			router.push('/notebooks')
		},
		onError: (error) => {
			toggleLoader(false);
			Notify.failure(`${error.message}!`);
		}
	});

	useEffect(() => {
		if (localStorage.token)
			router.push('/notebooks')
	}, []);

	if (loading)
		toggleLoader(true);

	if (localStorage.token)
		return <></>;

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
							<div className="my-5">
								<input
									className="input w-full"
									type="text"
									placeholder="Email"
									value={email}
									onChange={onEmailChange}
									required={true}
									pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
									title="Enter a valid email address."
								/>
							</div>
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