"use client"

import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useMutation, gql } from '@apollo/client';
import { useDarkMode } from '@/app/dark-mode-context';

const LOGIN_MUTATION = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				email
				firstName
				id
				lastName
				username
			}
		}
	}
`;

export default function Page() {
	const { isDarkMode, toggleDarkMode } = useDarkMode();
	const [systemPreferenceDarkMode, setSystemPreferenceDarkMode] = useState(false);

  useEffect(() => {
    // Check the user's system preference for dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setSystemPreferenceDarkMode(prefersDarkMode);
  }, []);

  const initialDarkMode = systemPreferenceDarkMode || isDarkMode;

	const [loginMutation] = useMutation(LOGIN_MUTATION);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const handlePasswordToggle = () => {
		setShowPassword(!showPassword);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleLogin = async () => {
		try {
			const { data } = await loginMutation({
				variables: {
					email: email,
					password: password,
				},
			});

			if (data && data.login && data.login.user) {
				const username = data.login.user.username;
				console.log('Login successful. Username:', username);

				// Redirect to home screen
				window.location.href = '/';
			} else {
				console.log('Login failed. Please check your credentials.');
			}
		} catch (error) {
			console.error('Error logging in:', error);
		}
	};

	return (
		<div className={`body ${initialDarkMode ? 'dark-mode' : 'light-mode'}`}>
			<div className="flex flex-col items-center justify-center min-h-screen w-full">
				<div className="flex justify-between items-center w-full p-8 absolute top-0 left-0 max-w-full box-border">
					<h1 className="font-montez font-normal text-5xl leading-8">Cursif</h1>

					<div>
						<button onClick={toggleDarkMode}>{initialDarkMode ? 'Light Mode' : 'Dark Mode'}</button>
					</div>

					<div className="relative w-182 h-33 top-51 left-1211">
						<button className={`w-full h-full font-roboto font-normal text-2xl leading-7 text-center px-3 py-2 rounded-md transition duration-300
						buttonRegister ${initialDarkMode ? 'bg-color-light' : 'bg-color-dark'
							}`}>Register</button>
					</div>
				</div>

				<div className="relative">
					<h2 className="mb-24 text-5xl text-center">
						<b className="font-semibold">LOG</b> IN
					</h2>
					<div>
						<input
							className={`p-3 px-14 mb-15 rounded-md my-3 transition duration-300 ${initialDarkMode ? 'bg-neutral-900 text-white' : 'bg-gray-200 text-black hover:bg-opacity-100 hover:text-black'}`}
							type="text"
							placeholder="Email"
							value={email}
							onChange={handleEmailChange}
						/>

						<div className="relative">
							<input
								className={`p-3 px-14 mb-15 rounded-md my-3 transition duration-300 ${initialDarkMode ? 'bg-neutral-900 text-white' : 'bg-gray-200 text-black hover:bg-opacity-100 hover:text-black'}`}
								type={showPassword ? 'text' : 'password'}
								placeholder="Password"
								value={password}
								onChange={handlePasswordChange}
							/>
							<button
								className="absolute top-10 right-3 transform -translate-y-1/2 border-none bg-transparent cursor-pointer"
								onClick={handlePasswordToggle}
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</button>
						</div>

						<div className="float-left text-sm">
							<a href="#">Forgot Password?</a>
						</div>

						{/* Using float isn't the best approach but until this is full refactored it's fine*/}
						<button className="button accent mt-8 float-right" onClick={handleLogin}>Login</button>
					</div>
				</div>
			</div>
		</div>
	);
}