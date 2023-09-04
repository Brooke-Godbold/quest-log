import PropTypes from "prop-types";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { useLogin } from "../../../query/auth/useLogin";

import { AiOutlineLogin } from "react-icons/ai";
import { MdAppRegistration } from "react-icons/md";

import Button from "../../../ui/button/Button.component";
import Spinner from "../../../ui/spinner/Spinner";
import Notification from "../../../ui/notification/Notification.component";

import {
  LoginButtonsContainer,
  LoginFormInputTable,
  LoginHeading,
  LoginModalButton,
  StyledLoginForm,
} from "./LoginForm.styles";
import { ResponsiveButtonContent } from "../../../ui/responsive-button-content/ResponsiveButtonContent.styles";
import { FormInput } from "../../../ui/FormInput/FormInput.styles";

import { onErrorToast } from "../../../utils/onErrorToast";

function LoginForm({ onCloseModal, setIsResetPassword }) {
  const { register, handleSubmit } = useForm();
  const { login, isLoggingIn } = useLogin();

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  function onSubmit(data) {
    setErrors({});

    login(data, {
      onSuccess: () => {
        onCloseModal?.();
      },
      onError: () =>
        toast.error((t) => (
          <Notification
            toast={t}
            text="Unable to login at this time, check your credentials"
          />
        )),
    });
  }

  function onError(e) {
    onErrorToast(e);
  }

  function onForgottenPassword(e) {
    e.preventDefault();
    setIsResetPassword(true);
  }

  if (isLoggingIn) return <Spinner />;

  return (
    <StyledLoginForm onSubmit={handleSubmit(onSubmit, onError)}>
      {isLoggingIn ? (
        <Spinner />
      ) : (
        <>
          <LoginHeading>Login</LoginHeading>
          <LoginFormInputTable $rows={2}>
            <label>Email</label>
            <FormInput
              type="email"
              id="email"
              placeholder="john.smith@gmail.com"
              disabled={isLoggingIn}
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: { value: true, message: "Email is required!" },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "This email is not valid!",
                },
              })}
            />

            <label>Password</label>
            <FormInput
              type="password"
              id="password"
              disabled={isLoggingIn}
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password", {
                value: true,
                message: "Password is required!",
              })}
            />
          </LoginFormInputTable>

          <LoginButtonsContainer>
            <Button disabled={isLoggingIn} isLight={true}>
              <ResponsiveButtonContent>
                <p>Login</p>
                <AiOutlineLogin />
              </ResponsiveButtonContent>
            </Button>
            <Button
              disabled={isLoggingIn}
              isLight={true}
              onClick={(e) => {
                e.preventDefault();
                onCloseModal?.();
                navigate("/signup", { replace: true });
              }}
            >
              <ResponsiveButtonContent>
                <p>Sign Up</p>
                <MdAppRegistration />
              </ResponsiveButtonContent>
            </Button>
          </LoginButtonsContainer>

          <LoginModalButton onClick={onForgottenPassword}>
            Forgotten your password?
          </LoginModalButton>
        </>
      )}
    </StyledLoginForm>
  );
}

LoginForm.propTypes = {
  onCloseModal: PropTypes.func,
  setIsResetPassword: PropTypes.func.isRequired,
};

export default LoginForm;
