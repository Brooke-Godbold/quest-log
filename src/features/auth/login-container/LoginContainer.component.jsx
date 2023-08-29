import { useState } from "react";
import LoginForm from "../login-form/LoginForm.component";
import ResetPasswordRequestForm from "../reset-password-request-form/ResetPasswordRequestForm.component";
import { StyledLoginContainer } from "./LoginContainer.styles";

function LoginContainer() {
  const [isResetPassword, setIsResetPassword] = useState(false);

  return (
    <StyledLoginContainer>
      {isResetPassword ? (
        <ResetPasswordRequestForm setIsResetPassword={setIsResetPassword} />
      ) : (
        <LoginForm setIsResetPassword={setIsResetPassword} />
      )}
    </StyledLoginContainer>
  );
}

export default LoginContainer;
