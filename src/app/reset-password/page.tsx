"use client"

import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Spinner } from '@components/loader';
import { useRouter, useSearchParams } from 'next/navigation';
import Notify from '@config/notiflix-config';

const SEND_RESET_PASSWORD_MUTATION = gql`
  mutation SendResetPasswordToken($email: String!) {
    sendResetPasswordToken(email: $email)
  }
`;

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($password: String!, $token: String!) {
    resetPassword(password: $password, token: $token)
  }
`;

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const toggleLoader = (state: boolean) => {
    const button: HTMLElement | null = document.getElementById("login-button");
    if (button) {
      button.classList.toggle("loading", state);
    }
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (token) {
      if (password && confirmPassword) {
        if (password !== confirmPassword) {
          Notify.failure("Passwords do not match!");
        } else {
          resetPassword();
        }
      } else {
        Notify.failure("Please enter both password and confirmation password!");
      }
    } else if (email) {
      sendResetPassword();
    }
  };

  const [sendResetPassword, { loading: sendLoading, error: sendError }] = useMutation(SEND_RESET_PASSWORD_MUTATION, {
    variables: {
      email: email,
    },
    onCompleted: (data) => {
      toggleLoader(false);
      Notify.success(`Email sent!`);
      router.push('/');
    },
    onError: (error) => {
      toggleLoader(false);
      Notify.failure(`${error.message}!`);
    },
  });

  const [resetPassword, { loading: resetLoading, error: resetError }] = useMutation(RESET_PASSWORD_MUTATION, {
    variables: {
      password: confirmPassword,
      token: token,
    },
    onCompleted: (data) => {
      toggleLoader(false);
      Notify.success(`Password Changed Successfully!`);
      router.push('/login');
    },
    onError: (error) => {
      toggleLoader(false);
      console.log('onError error:', error);
      Notify.failure(`${error.message}!`);
    },
  });

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
              <h1 className="text-5xl">
                {token ? <b>New Password</b> : <b>Reset</b>}
              </h1>
            </div>

            <div className="text-center mt-5">
              <h2 className="text-s text-gray-300">
                {token ? "Enter your new password." : "Enter your email address to reset your password."}
              </h2>
            </div>

            <div className="my-16">
              {
                token ? <>
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
                </> : <div className="my-5">
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
              }
            </div>

            <button id="login-button" className="button !bg-accent !text-white float-right" type="submit">
              <span className="spinner"><Spinner /></span>
              <span className="label">{token ? "Reset Password" : "Send"}</span>
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
