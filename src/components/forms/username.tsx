import React, { useState } from 'react';

export function Username({ username, setUsername }: { username: string, setUsername: (username: string) => void }) {
  const [isBlurred, setIsBlurred] = useState(false);

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onUsernameBlur = () => {
    setIsBlurred(true);
  };

  return (
    <div className="my-5">
      <input
        className={`input w-full ${isBlurred && username.trim() === '' ? 'invalid' : ''}`}
        type="text"
        placeholder="Username"
        value={username}
        onChange={onUsernameChange}
        onBlur={onUsernameBlur}
        required={true}
      />
      {isBlurred && username.trim() === '' && (
        <div className="border-red-400 text-red-500 mt-2">
          Please enter a username.
        </div>
      )}
    </div>
  );
}
