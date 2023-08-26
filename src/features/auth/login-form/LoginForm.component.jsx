import PropTypes from "prop-types";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "../../../ui/button/Button.component";

import {
  LoginButtonsContainer,
  LoginFormErrorContainer,
  LoginFormInput,
  LoginFormInputTable,
  LoginHeading,
  LoginModalButton,
  StyledLoginForm,
} from "./LoginForm.styles";
import { FormError } from "../../../ui/form-error/FormError.styles";

import { useLogin } from "./useLogin";
import Spinner from "../../../ui/spinner/Spinner";

function LoginForm({ onCloseModal, setIsResetPassword }) {
  const { register, handleSubmit } = useForm();
  const { login, isLoggingIn } = useLogin();

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [isLoginError, setIsLoginError] = useState(false);

  function onSubmit(data) {
    setErrors({});

    login(data, {
      onSuccess: () => {
        setIsLoginError(false), onCloseModal?.();
      },
      onError: () => setIsLoginError(true),
    });
  }

  function onError(e) {
    setErrors(e);
  }

  function onForgottenPassword(e) {
    e.preventDefault();
    setIsResetPassword(true);
  }

  if (isLoggingIn) return <Spinner />;

  return (
    <StyledLoginForm onSubmit={handleSubmit(onSubmit, onError)}>
      <LoginHeading>Login</LoginHeading>
      <LoginFormInputTable $rows={2}>
        <label>Email</label>
        <LoginFormInput
          type="email"
          id="email"
          placeholder="john.smith@gmail.com"
          disabled={isLoggingIn}
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })}
        />

        <label>Password</label>
        <LoginFormInput
          type="password"
          id="password"
          disabled={isLoggingIn}
          aria-invalid={errors.password ? "true" : "false"}
          {...register("password", { required: true })}
        />
      </LoginFormInputTable>

      <LoginModalButton onClick={onForgottenPassword}>
        Forgotten your password?
      </LoginModalButton>

      <LoginFormErrorContainer>
        {errors.email && errors.email.type === "required" && (
          <FormError>Email is required</FormError>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <FormError>This is not a valid email address</FormError>
        )}
        {errors.password && errors.password.type === "required" && (
          <FormError>Password is required</FormError>
        )}
        {isLoginError && <FormError>Invalid Login</FormError>}
      </LoginFormErrorContainer>

      <LoginButtonsContainer>
        <Button disabled={isLoggingIn} isLight={true}>
          Login
        </Button>
        <Button
          disabled={isLoggingIn}
          isLight={true}
          onClick={() => {
            onCloseModal?.();
            navigate("/signup", { replace: true });
          }}
        >
          Sign Up
        </Button>
      </LoginButtonsContainer>
    </StyledLoginForm>
  );
}

LoginForm.propTypes = {
  onCloseModal: PropTypes.func,
  setIsResetPassword: PropTypes.func.isRequired,
};

export default LoginForm;
