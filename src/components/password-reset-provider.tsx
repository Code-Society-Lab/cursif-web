import { Password } from "./forms/password";
import { Email } from "./forms/email";

export function PasswordResetProvider({
  if: condition,
  setPassword: setPassword,
  setConfirmPassword: setConfirmPassword,
  password: password,
  confirmPassword: confirmPassword,
  email: email,
  setEmail: setEmail,
  isValidEmail: isValidEmail,
  setIsValidEmail: setIsValidEmail,
}: {
  if: boolean,
  setPassword: (password: string) => void,
  setConfirmPassword: (confirmPassword: string) => void,
  password: string,
  confirmPassword: string,
  email: string,
  setEmail: (email: string) => void,
  isValidEmail: boolean,
  setIsValidEmail: (isValidEmail: boolean) => void,
}) {
  if (condition)
    return (
      <>
        <div className="flex justify-end items-center relative my-5">
          <Password
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
        </div>
      </>
    );

  return (
    <Email
      email={email}
      setEmail={setEmail}
      isValidEmail={isValidEmail}
      setIsValidEmail={setIsValidEmail}
    />
  );
}
