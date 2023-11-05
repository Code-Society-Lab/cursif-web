import React, { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { XCircleIcon } from '@heroicons/react/24/solid'

export function Password({
  password, setPassword, confirmPassword, setConfirmPassword
}: {
  password: string, setPassword: (password: string) => void,
  confirmPassword: string, setConfirmPassword: (confirmPassword: string) => void
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const onBlur = () => {
    setIsBlurred(true);
  };
  // Check mark and X mark for password validation
  const checkMark = <CheckCircleIcon className="h-4 w-4 text-green-500" />;
  const xMark = <XCircleIcon className="h-4 w-4 text-red-500" />;

  return (
    <div className="my-5">
      <div className="flex justify-end items-center relative my-5">
        <input
          className={`input w-full ${isBlurred && password == '' ? 'invalid' : ''}`}
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          onBlur={onBlur}
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
          className={`input w-full ${isBlurred && confirmPassword == '' ? 'invalid' : ''}`}
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          onBlur={onBlur}
          required={true}
        />
        <div className="input-group">
          <button className="svg" onClick={toggleShowPassword} type="button">
            <img className="w-8" src={showPassword ? "/eye.svg" : "/eye-slash.svg"} />
          </button>
        </div>
      </div>

      <div className='text-sm'>
        <br />
        <span>Passwords Must:</span>
        <ul>
          <li>
            <span className="icon-mark">
              {password.length > 8 ? checkMark : xMark}
              <span className="ml-2">Be at least 8 characters long</span>
            </span>
          </li>
          <li>
            <span className="icon-mark">
              {/\d/.test(password) ? checkMark : xMark}
              <span className="ml-2">Contain at least one number</span>
            </span>
          </li>
          <li>
            <span className="icon-mark">
              {(/[A-Z]/.test(password)) ? checkMark : xMark}
              <span className="ml-2">Contain at least one uppercase letter</span>
            </span>
          </li>
          <li>
            <span className="icon-mark">
              {/[a-z]/.test(password) ? checkMark : xMark}
              <span className="ml-2">Contain at least one lowercase letter</span>
            </span>
          </li>
          <li>
            <span className="icon-mark">
              {(password !== "" && password === confirmPassword) ? checkMark : xMark}
              <span className="ml-2">Password must match Confirm Password</span>
            </span>
          </li>

        </ul>
      </div>
    </div>
  );
}
