export default function PasswordResetProvider({
  if: condition,
  showPassword: showPassword,
  password: password,
  confirmPassword: confirmPassword,
  onPasswordChange: onPasswordChange,
  onConfirmPasswordChange: onConfirmPasswordChange,
  toggleShowPassword: toggleShowPassword,
  email: email,
  onEmailChange: onEmailChange,
}: {
  if: boolean,
  showPassword: boolean,
  password: string,
  confirmPassword: string,
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onConfirmPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  toggleShowPassword: () => void,
  email: string,
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}) {
  if (condition)
    return (
      <>
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
      </>
    );

  return (
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
  );
}
