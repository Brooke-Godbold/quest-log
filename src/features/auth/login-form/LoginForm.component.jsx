import PropTypes from "prop-types";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { useLogin } from "../../../query/auth/useLogin";
import { useConversations } from "../../../contexts/ConversationsContext";

import { AiOutlineLogin } from "react-icons/ai";
import { MdAppRegistration } from "react-icons/md";

import Button from "../../../ui/button/Button.component";
import Spinner from "../../../ui/spinner/Spinner";
import Notification from "../../../ui/notification/Notification.component";

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
import { ResponsiveButtonContent } from "../../../ui/responsive-button-content/ResponsiveButtonContent.styles";

function LoginForm({ onCloseModal, setIsResetPassword }) {
  const { register, handleSubmit } = useForm();
  const { login, isLoggingIn } = useLogin();

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const { setCurrentConversation } = useConversations();

  function onSubmit(data) {
    setErrors({});

    login(data, {
      onSuccess: () => {
        onCloseModal?.();
        setCurrentConversation(null);
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
    setErrors(e);
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
            <LoginFormInput
              type="email"
              id="email"
              placeholder="john.smith@gmail.com"
              disabled={isLoggingIn}
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: true,
                pattern: /\S+@\S+\.\S+/,
              })}
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
          </LoginFormErrorContainer>

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
