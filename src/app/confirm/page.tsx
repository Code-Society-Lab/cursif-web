"use client"

import { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Spinner } from '@components/loader';
import { useRouter } from 'next/navigation'
import Notify from '@config/notiflix-config';

const SEND_CONFIRMATION_EMAIL_MUTATION = gql`
  mutation ResendConfirmationEmail($email: String!) {
    resendConfirmationEmail(email: $email) {
        email
        firstName
        id
        lastName
        username
    }
  }
`;

export default function Page() {
	const router = useRouter()

	const [email, setEmail] = useState('');

	const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (email)
    send_confirmation_email();
	};

	const toggleLoader = (state: boolean) => {
		const button: HTMLElement | null = document.getElementById("login-button");

		if (button)
			button.classList.toggle("loading", state);
	};

	const [send_confirmation_email, { data, loading, error }] = useMutation(SEND_CONFIRMATION_EMAIL_MUTATION, {
		variables: {
			email: email
		},
		onCompleted: ({ data }) => {
			toggleLoader(false);
			Notify.success(`Confirmation email sent!`);
			router.push('/login')
		},
		onError: (error) => {
			toggleLoader(false);
			Notify.failure(`${error.message}!`);
		}
	});

	useEffect(() => {
		send_confirmation_email();
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
					<a href="/signin" className="button"><span className="label">Sign In</span></a>
				</div>
			</div>

			<div className="flex-1 p-5">
				<div className="flex justify-center h-full">
					<form className="w-[350px]" onSubmit={onSubmit}>
						<div className="text-center mt-20">
							<h1 className="text-5xl">Resend <b>Confirmation</b> Email!</h1>
						</div>

						<div className="my-20">
							<div className="my-5">
								<input 
									className="input w-full" 
									type="text" 
									placeholder="Current Email"
									value={email}
									onChange={onEmailChange}
									required={true}
									pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
									title="Enter a valid email address."
								/>
							</div>
						</div>

					  <button id="login-button" className="button !bg-accent !text-white float-right" type="submit">
					  	<span className="spinner"><Spinner /></span>
					    <span className="label">Send</span>  	   
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