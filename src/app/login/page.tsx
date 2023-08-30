"use client"

import React, { useState } from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import { useMutation, gql } from '@apollo/client';
import EyeIcon from '../eye-icone';

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
		<div className="flex flex-col h-screen">
			<div className="grid grid-cols-2 p-5">
				<div className="flex">
					<p className="text-5xl font-montez">Cursif</p>
				</div>
				<div className="flex items-center justify-end">
					<a href="/signin" className="button">Sign In</a>
				</div>
			</div>

			<div className="flex-1 p-5">
				<div className="flex justify-center h-full">
					<div className="w-[350px]">
						<div className="text-center mt-40">
							<h1 className="text-5xl"><b>LOG</b> IN</h1>
						</div>

						<div className="my-20">
							<div className="my-5">
								<input 
									className="input w-full" 
									type="text" 
									placeholder="Email"
									value={email}
									onChange={handleEmailChange} 
								/>
							</div>
							<div className="my-5">
								<div className="flex justify-end items-center relative">
									<input 
										className="input w-full" 
										type={showPassword ? 'text' : 'password'}
										placeholder="Password"z
										value={password}
										onChange={handlePasswordChange}
										/>
									<button
										className="absolute w-auto input"
										onClick={handlePasswordToggle}>
										{showPassword ? "hide" : "show"}
									</button>
								</div>

								<div className="m-2">
									<a href="#">Forgot Password?</a>
								</div>
							</div>
						</div>

						<button className="button accent float-right" onClick={handleLogin}>Login</button>
					</div>
				</div>
			</div>

			<div className="flex justify-center text-center p-5">
				<span>Made by the <a className="font-bold hover:underline" href="https://codesociety.xyz/">Code Society</a> - &copy; 2023</span>
			</div>
		</div>
	);
}