"use client"

import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Spinner } from '@components/loader';
import { Email } from '@/components/forms/email';
import { Password } from '@/components/forms/password';
import { Username } from '@/components/forms/username';
import Navigation from '@/components/navigation';
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
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const [errorMsg, setErrorMsg] = useState('');

	const onFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFirstName(event.target.value);
	};

	const onLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLastName(event.target.value);
	};

	const validateForm = () => {
		let isValid = true;

		if (!username || !email || !password || password !== confirmPassword) {
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
			firstName: firstName,
			lastName: lastName,
		},
		onCompleted: () => {
			toggleLoader(false);
			Notify.success(`Thanks for register. Please, confirm your email address!`);
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
							<div className="flex row my-5">
								<input
									className="input w-full mr-3"
									type="text"
									placeholder="First Name"
									value={firstName}
									onChange={onFirstNameChange}
									required={false}
								/>

								<input
									className="input w-full"
									type="text"
									placeholder="Last Name"
									value={lastName}
									onChange={onLastNameChange}
									required={false}
								/>
							</div>

							<Username username={username} setUsername={setUsername} />
							<Email email={email} setEmail={setEmail} />
							<Password
								password={password} setPassword={setPassword}
								confirmPassword={confirmPassword}
								setConfirmPassword={setConfirmPassword}
							/>

							{errorMsg && <div className="invalid">{errorMsg}</div>}
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