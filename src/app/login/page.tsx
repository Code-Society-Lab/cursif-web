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
		<div className='dark'>
			<div className="container">
				<div className="header">
					<h1 className="header-cursif"><a href="/">Cursif</a></h1>

					<div className="relative l-10">
						<button className="registerButton">Register</button>
					</div>
				</div>

				<div className="relative">
					<h2 className="mb-24 text-5xl text-center">
						<b className="font-semibold">LOG</b> IN
					</h2>

					<div>
						<div className="relative">
							<input
								className='inputBox'
								type="text"
								placeholder="Email"
								value={email}
								onChange={handleEmailChange}
							/>
						</div>

						<div className="relative">
							<input
								className="inputBox"
								type={showPassword ? 'text' : 'password'}
								placeholder="Password"
								value={password}
								onChange={handlePasswordChange}
							/>
							<button
								className="passwordEyeButton"
								onClick={handlePasswordToggle}>
								{showPassword ? <FaEyeSlash /> : <EyeIcon />}
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