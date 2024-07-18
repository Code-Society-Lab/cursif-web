import React, { useState } from 'react';

export function Email({
  email, setEmail, isValidEmail, setIsValidEmail
}: {
  email: string, setEmail: (email: string) => void,
  isValidEmail: boolean, setIsValidEmail: (isValidEmail: boolean) => void
}) {
  const [isBlurred, setIsBlurred] = useState(false);

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const onEmailBlur = () => {
    setIsBlurred(true);
    setIsValidEmail(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email));
  };

  return (
    <div className="my-5">
      <input
        className={`input w-full ${isBlurred && !isValidEmail ? 'invalid' : ''}`}
        type="email"
        placeholder="Email"
        value={email}
        onChange={onEmailChange}
        onBlur={onEmailBlur}
        required={true}
        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
        title="Enter a valid email address."
      />
      {isBlurred && !isValidEmail && (
        <div className="text-red-500 mt-2">
          Please enter a valid email address.
        </div>
      )}
    </div>
  );
}