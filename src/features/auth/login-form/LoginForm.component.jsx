import PropTypes from "prop-types";
import { useState } from "react";
import Button from "../../../ui/button/Button.component";
import {
  FormError,
  FormErrorContainer,
  FormInput,
  FormInputTable,
  FormLabel,
  LoginHeading,
  StyledLoginForm,
} from "./LoginForm.styles";
import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";

function LoginForm({ onCloseModal }) {
  const { register, handleSubmit } = useForm();
  const { login, isLoggingIn } = useLogin();

  const [errors, setErrors] = useState({});
  const [isLoginError, setIsLoginError] = useState(false);

  function onSubmit(data) {
    //console.log(`SUBMIT`, data);
    setErrors({});

    login(data, {
      onSuccess: () => {
        setIsLoginError(false), onCloseModal?.();
      },
      onError: () => setIsLoginError(true),
    });
  }

  function onError(e) {
    //console.log(`ERROR`, e);
    setErrors(e);
  }

  return (
    <StyledLoginForm onSubmit={handleSubmit(onSubmit, onError)}>
      <LoginHeading>Login</LoginHeading>
      <FormInputTable>
        <FormLabel>Email</FormLabel>
        <FormInput
          type="email"
          id="email"
          placeholder="john.smith@gmail.com"
          disabled={isLoggingIn}
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })}
        />

        <FormLabel>Password</FormLabel>
        <FormInput
          type="password"
          id="password"
          disabled={isLoggingIn}
          aria-invalid={errors.password ? "true" : "false"}
          {...register("password", { required: true })}
        />
      </FormInputTable>

      <FormErrorContainer>
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
      </FormErrorContainer>

      <Button disabled={isLoggingIn} isLight={true}>
        Login
      </Button>
    </StyledLoginForm>
  );
}

LoginForm.propTypes = {
  onCloseModal: PropTypes.func,
};

export default LoginForm;
