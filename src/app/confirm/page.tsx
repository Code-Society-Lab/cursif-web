"use client"

import { useState, useEffect, Suspense } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Spinner } from '@components/loader';
import { useRouter, useSearchParams } from 'next/navigation'
import { Notify } from '@config/notiflix-config';
import { AnonymousNavigation } from '@components/navigation'

const SEND_CONFIRMATION_EMAIL_MUTATION = gql`
  mutation ResendConfirmationEmail($email: String!) {
    resendConfirmationEmail(email: $email) 
  }
`;

const CONFIRM_EMAIL_MUTATION = gql`
   mutation Confirm($token: String!) {
     confirm(token: $token)
   }
 `;

export default function Page() {
	const searchParams = useSearchParams()
	const token = searchParams.get("token");
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

	// Send Confirmation Email to user
	const [send_confirmation_email, { loading: sendLoading, error: sendError }] = useMutation(SEND_CONFIRMATION_EMAIL_MUTATION, {
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

	// Confirm User Email Address
	const [confirm_email, { loading: confirmLoading, error: confirmError }] = useMutation(CONFIRM_EMAIL_MUTATION, {
		variables: {
			token: token
		},
		onCompleted: (data) => {
			toggleLoader(false);
			Notify.success(`Email Address Confirmed Successfully!`);
			router.push('/login');
		},
		onError: (error) => {
			toggleLoader(false);
			Notify.failure(`${error.message}!`);
		}
	});

	// Use useEffect to conditionally confirm email
	useEffect(() => {
		if (token) {
			confirm_email();
		}
	}, [token]);

	if (confirmLoading || sendLoading)
		toggleLoader(true);

	return (
		<div className="flex flex-col h-screen">
			<AnonymousNavigation />

			<div className="flex-1 p-5">
				<div className="flex justify-center h-full">
					<form className="w-[350px]" onSubmit={onSubmit}>
						<div className="text-center mt-20">
							<h1 className="text-5xl"><b>Confirmation</b></h1>

						</div>

						<div className="text-center mt-5">
							<h2 className="text-s text-gray-300">Submit your email to get a new confirmation code!</h2>
						</div>

						<div className="mt-10">
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