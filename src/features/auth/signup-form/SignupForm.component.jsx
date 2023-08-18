import { useForm } from "react-hook-form";
import Button from "../../../ui/button/Button.component";
import {
  FormError,
  FormErrorContainer,
  FormInput,
  FormInputTable,
  FormLabel,
} from "../login-form/LoginForm.styles";
import {
  SignupHeading,
  SignupSuccessContainer,
  SignupSuccessText,
  StyledSignupForm,
} from "./SIgnupForm.styles";
import { useEffect, useState } from "react";
import { useUser } from "../useUser";
import { useNavigate } from "react-router-dom";
import { useProfile } from "./useProfile";
import { useSignup } from "./useSignup";
import { useAddProfile } from "./useAddProfile";

function SignupForm() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  if (isAuthenticated) navigate("/search", { replace: true });

  const { register, handleSubmit, getValues } = useForm();

  const [errors, setErrors] = useState({});
  const [emailCheck, setEmailCheck] = useState("");
  const [emailInUse, setEmailInUse] = useState(false);

  const [signupSuccess, setSignupSuccess] = useState(false);

  const { isGettingProfile, profile } = useProfile(emailCheck);
  const { signup, isSigningUp } = useSignup();
  const { addProfile, isAddingProfile } = useAddProfile();

  function onSubmit(data) {
    console.log(`SUBMIT`, data);
    setErrors({});
    setEmailInUse(false);
    setEmailCheck(data.email);
  }

  function onError(e) {
    console.log(`ERROR`, e);
    setErrors(e);
  }

  useEffect(
    function () {
      if (!profile) return;

      if (profile.length) {
        setEmailInUse(true);
      } else {
        signup(
          { email: getValues().email, password: getValues().password },
          {
            onSuccess: (user) => {
              addProfile(
                {
                  email: getValues().email,
                  userId: user.user.id,
                  username: getValues().username,
                },
                { onSuccess: setSignupSuccess(true) }
              );
            },
          }
        );
      }
    },
    [profile, signup, addProfile, getValues]
  );

  return (
    <>
      {signupSuccess ? (
        <SignupSuccessContainer>
          <SignupHeading>Almost There!</SignupHeading>
          <SignupSuccessText>
            Please verify your email before you login
          </SignupSuccessText>
        </SignupSuccessContainer>
      ) : (
        <StyledSignupForm onSubmit={handleSubmit(onSubmit, onError)}>
          <SignupHeading>Sign Up</SignupHeading>
          <FormInputTable $rows={4}>
            <FormLabel>Email</FormLabel>
            <FormInput
              type="email"
              id="email"
              placeholder="john.smith@gmail.com"
              disabled={isGettingProfile || isSigningUp || isAddingProfile}
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: true,
                pattern: /\S+@\S+\.\S+/,
              })}
            />

            <FormLabel>Username</FormLabel>
            <FormInput
              type="text"
              id="username"
              placeholder="John_Smith"
              disabled={isGettingProfile || isSigningUp || isAddingProfile}
              aria-invalid={errors.username ? "true" : "false"}
              {...register("username", {
                required: true,
                minLength: 8,
                maxLength: 20,
                validate: (value) => !value.includes(" "),
              })}
            />

            <FormLabel>Password</FormLabel>
            <FormInput
              type="password"
              id="password"
              disabled={isGettingProfile || isSigningUp || isAddingProfile}
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password", {
                required: true,
                minLength: 8,
                validate: (value) => !value.includes(" "),
              })}
            />

            <FormLabel>Confirm Password</FormLabel>
            <FormInput
              type="password"
              id="passwordConfirm"
              disabled={isGettingProfile || isSigningUp || isAddingProfile}
              aria-invalid={errors.passwordConfirm ? "true" : "false"}
              {...register("passwordConfirm", {
                required: true,
                validate: (value) => value === getValues().password,
              })}
            />
          </FormInputTable>

          <FormErrorContainer>
            {errors.email ? (
              errors.email.type === "required" ? (
                <FormError>Email is required</FormError>
              ) : (
                <FormError>This is not a valid email address</FormError>
              )
            ) : null}

            {errors.username ? (
              errors.username.type === "required" ? (
                <FormError>Username is required</FormError>
              ) : errors.username.type === "minLength" ? (
                <FormError>Usernames must be at least 8 characters</FormError>
              ) : errors.username.type === "maxLength" ? (
                <FormError>
                  Usernames cannot be more than 20 characters
                </FormError>
              ) : (
                <FormError>Usernames must not contain spaces</FormError>
              )
            ) : null}

            {errors.password ? (
              errors.password.type === "required" ? (
                <FormError>Password is required</FormError>
              ) : errors.password.type === "minLength" ? (
                <FormError>Passwords must be at least 8 characters</FormError>
              ) : (
                <FormError>Passwords must not contain spaces</FormError>
              )
            ) : null}

            {errors.passwordConfirm && (
              <FormError>Passwords must match</FormError>
            )}

            {emailInUse && (
              <FormError>This email has already been registered</FormError>
            )}
          </FormErrorContainer>

          <Button
            disabled={isGettingProfile || isSigningUp || isAddingProfile}
            isLight={true}
          >
            Sign Up
          </Button>
        </StyledSignupForm>
      )}
    </>
  );
}

export default SignupForm;
