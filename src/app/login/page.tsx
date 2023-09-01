"use client"

import { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import Spinner from '@components/spinner';
import { useRouter } from 'next/navigation'

const LOGIN_MUTATION = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				id
				username
				email
				firstName
				lastName
			}
		}
	}
`;

export default function Page() {	
	const router = useRouter()

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const onEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const onPasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const onSubmit = (event) => {
		event.preventDefault();

		if (email && password)
			login();
	};

	const toggleLoader = (state) => {
		var button = document.getElementById("login-button");
		button.classList.toggle("loading", state);
	};

	const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
		variables: {
			email: email,
			password: password,
		},
		onCompleted: ({ login }) => {
			localStorage.setItem('TOKEN', login.token);
			localStorage.setItem('USER', login.user);

			toggleLoader(false);
			router.push('/')
		},
		onError: (error) => {
			toggleLoader(false);
		}
	});

	if (loading)
		toggleLoader(true);

	return (
		<div className="flex flex-col h-screen">
			<div className="grid grid-cols-2 p-5">
				<div className="flex">
					<p className="text-5xl font-montez">Cursif</p>
				</div>
				<div className="flex items-center justify-end">
					<a href="/signin" className="button"><span className="label">Sign In</span></a>
				</div>
			</div>

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
									required="required"
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
										required="required"
										/>
									<div className="input-group">
										<button className="svg" onClick={toggleShowPassword} type="button">
											<img className="w-8" src={showPassword ? "/eye.svg" : "/eye-slash.svg"} />
										</button>
									</div>
								</div>

								<div className="m-2">
									<a href="#">Forgot Password?</a>
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