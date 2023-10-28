"use client"

import { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Spinner } from '@components/loader';
import { useRouter } from 'next/navigation'
import Notify from '@config/notiflix-config';

const REGISTER_MUTATION = gql`
	mutation Register($email: String!, $password: String!, $username: String!, $firstName: String!, $lastName: String!) {
		register(email: $email, password: $password, username: $username, firstName: $firstName, lastName: $lastName) {
			email
      firstName
      id
      lastName
      username
		}
	}
`;

export default function Page() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const onConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(event.target.value);
	};

	const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};

	const onFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFirstName(event.target.value);
	};

	const onLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLastName(event.target.value);
	};

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (email && password && confirmPassword) {
			if (password !== confirmPassword) {
				Notify.failure("Passwords do not match!");
			} else {
				register();
			}
		} else {
			Notify.failure("Please enter email, password and confirm your password!");
		}
	};

	const toggleLoader = (state: boolean) => {
		const button: HTMLElement | null = document.getElementById("login-button");

		if (button)
			button.classList.toggle("loading", state);
	};

	const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION, {
		variables: {
			email: email,
			password: confirmPassword,
			username: username,
			firstName: firstName,
			lastName: lastName,
		},
		onCompleted: ({ register }) => {
			localStorage.setItem('token', register.token);

			toggleLoader(false);
			Notify.success(`Thanks for signin in. Please, confirm your email address!`);
			router.push('/')
		},
		onError: (error) => {
			toggleLoader(false);
			Notify.failure(`${error.message}!`);
		}
	});

	useEffect(() => {
		if (localStorage.token)
			router.push('/login')
	}, []);

	if (loading)
		toggleLoader(true);

	return (
		<div className="flex flex-col h-screen">
			<div className="grid grid-cols-2 p-5">
				<div className="flex">
					<p className="text-5xl font-montez">Cursif</p>
				</div>
				<div className="flex items-center justify-end">
					<a href="/login" className="button"><span className="label">Log In</span></a>
				</div>
			</div>

			<div className="flex-1 p-5">
				<div className="flex justify-center h-full">
					<form className="w-[400px]" onSubmit={onSubmit}>
						<div className="text-center mt-20">
							<h1 className="text-5xl"><b>SIGN</b> IN</h1>
						</div>

						<div className="my-8">
							<div className="flex row my-5">
								<input
									className="input w-full mr-3"
									type="text"
									placeholder="First Name"
									value={firstName}
									onChange={onFirstNameChange}
									required={true}
								/>

								<input
									className="input w-full"
									type="text"
									placeholder="Last Name"
									value={lastName}
									onChange={onLastNameChange}
									required={true}
								/>
							</div>

							<div className="my-5">
								<input
									className="input w-full"
									type="text"
									placeholder="Username"
									value={username}
									onChange={onUsernameChange}
									required={true}
								/>
							</div>

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
								<div className="flex justify-end items-center relative my-5">
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

								<div className="flex justify-end items-center relative">
									<input
										className="input w-full"
										type={showPassword ? 'text' : 'password'}
										placeholder="Confirm Password"
										value={confirmPassword}
										onChange={onConfirmPasswordChange}
										required={true}
									/>
									<div className="input-group">
										<button className="svg" onClick={toggleShowPassword} type="button">
											<img className="w-8" src={showPassword ? "/eye.svg" : "/eye-slash.svg"} />
										</button>
									</div>
								</div>


							</div>
						</div>

						<button id="login-button" className="button !bg-accent !text-white float-right" type="submit">
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