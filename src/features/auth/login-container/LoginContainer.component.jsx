import { useState } from "react";
import LoginForm from "../login-form/LoginForm.component";
import ResetPasswordRequestForm from "../reset-password-request-form/ResetPasswordRequestForm.component";

function LoginContainer() {
  const [isResetPassword, setIsResetPassword] = useState(false);

  return (
    <>
      {isResetPassword ? (
        <ResetPasswordRequestForm setIsResetPassword={setIsResetPassword} />
      ) : (
        <LoginForm setIsResetPassword={setIsResetPassword} />
      )}
    </>
  );
}

export default LoginContainer;
