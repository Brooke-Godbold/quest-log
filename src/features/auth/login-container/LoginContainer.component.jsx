import PropTypes from "prop-types";

import { useState } from "react";

import LoginForm from "../login-form/LoginForm.component";
import ResetPasswordRequestForm from "../reset-password-request-form/ResetPasswordRequestForm.component";

import { StyledLoginContainer } from "./LoginContainer.styles";

function LoginContainer({ onCloseModal }) {
  const [isResetPassword, setIsResetPassword] = useState(false);

  return (
    <StyledLoginContainer>
      {isResetPassword ? (
        <ResetPasswordRequestForm setIsResetPassword={setIsResetPassword} />
      ) : (
        <LoginForm
          onCloseModal={onCloseModal}
          setIsResetPassword={setIsResetPassword}
        />
      )}
    </StyledLoginContainer>
  );
}

LoginContainer.propTypes = {
  onCloseModal: PropTypes.func,
};

export default LoginContainer;
