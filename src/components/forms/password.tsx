import React, { useState } from 'react';

export function Password({
  password, setPassword, confirmPassword, setConfirmPassword
}: {
  password: string, setPassword: (password: string) => void,
  confirmPassword: string, setConfirmPassword: (confirmPassword: string) => void
}) {
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

  // Check mark and X mark for password validation
  const checkMark = <span className="text-green-600">&#10004;</span>;
  const xMark = <span className="text-red-600">&#x2717;</span>;

  return (
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

      <div className='text-sm'>
        <br />
        <span>Passwords Must:</span>
        <ul>
          <li>
            {password.length > 8 ? checkMark : xMark} Be at least 8 characters long
          </li>
          <li>
            {(/\d/.test(password)) ? checkMark : xMark} Contain at least one number or punctuation character
          </li>
          <li>
            {(/[A-Z]/.test(password)) ? checkMark : xMark} Contain at least one uppercase letter
          </li>
          <li>
            {/[a-z]/.test(password) ? checkMark : xMark} Contain at least one lowercase letter
          </li>
          <li>
            {(password !== "" && password === confirmPassword) ? checkMark : xMark} Password must match Confirm Password
          </li>
        </ul>
        <br />
        <span>By creating an account, you agree to Cursif <a href="#" className="underline text-blue-400">Terms & Conditions</a>.</span>
      </div>
    </div>
  );
}
