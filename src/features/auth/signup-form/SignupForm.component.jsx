import { useForm } from "react-hook-form";
import Button from "../../../ui/button/Button.component";
import {
  LoginFormErrorContainer,
  LoginFormInput,
} from "../login-form/LoginForm.styles";
import {
  SignUpGridContainer,
  SignUpGridItem,
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
import { FormError } from "../../../ui/form-error/FormError.styles";
import TextCount from "../../../ui/text-count/TextCount.component";
import { ProfileDetailsLabel } from "../../account/account-profile-details-section/AccountProfileDetailsSection.styles";

const USERNAME_MIN_LENGTH = 8;
const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;

function SignupForm() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  if (isAuthenticated) navigate("/search", { replace: true });

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm();
  const watchUsername = watch("username", "");
  const watchPassword = watch("password", "");

  const [emailCheck, setEmailCheck] = useState("");
  const [emailInUse, setEmailInUse] = useState(false);

  const [signupSuccess, setSignupSuccess] = useState(false);

  const { isGettingProfile, profile } = useProfile(emailCheck);
  const { signup, isSigningUp } = useSignup();
  const { addProfile, isAddingProfile } = useAddProfile();

  function onSubmit(data) {
    console.log(`SUBMIT`, data);
    setEmailInUse(false);
    setEmailCheck(data.email);
  }

  function onError(e) {
    console.log(`ERROR`, e);
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
          <SignUpGridContainer>
            <SignUpGridItem>
              <ProfileDetailsLabel>Email</ProfileDetailsLabel>
              <LoginFormInput
                type="email"
                id="email"
                placeholder="john.smith@gmail.com"
                disabled={isGettingProfile || isSigningUp || isAddingProfile}
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", {
                  required: true,
                  pattern: /\S+@\S+\.\S+/,
                })}
                $error={errors.email}
              />
            </SignUpGridItem>

            <SignUpGridItem>
              <ProfileDetailsLabel>Username</ProfileDetailsLabel>
              <LoginFormInput
                type="text"
                id="username"
                placeholder="John_Smith"
                disabled={isGettingProfile || isSigningUp || isAddingProfile}
                aria-invalid={errors.username ? "true" : "false"}
                {...register("username", {
                  required: true,
                  minLength: USERNAME_MIN_LENGTH,
                  maxLength: USERNAME_MAX_LENGTH,
                  validate: (value) => !value.includes(" "),
                })}
                $error={errors.username}
              />
              <TextCount
                value={watchUsername}
                minLength={USERNAME_MIN_LENGTH}
                maxLength={USERNAME_MAX_LENGTH}
              />
            </SignUpGridItem>

            <SignUpGridItem>
              <ProfileDetailsLabel>Password</ProfileDetailsLabel>
              <LoginFormInput
                type="password"
                id="password"
                disabled={isGettingProfile || isSigningUp || isAddingProfile}
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", {
                  required: true,
                  minLength: PASSWORD_MIN_LENGTH,
                  validate: (value) => !value.includes(" "),
                })}
                $error={errors.password}
              />
              <TextCount
                value={watchPassword}
                minLength={PASSWORD_MIN_LENGTH}
              />
            </SignUpGridItem>

            <SignUpGridItem>
              <ProfileDetailsLabel>Confirm Password</ProfileDetailsLabel>
              <LoginFormInput
                type="password"
                id="passwordConfirm"
                disabled={isGettingProfile || isSigningUp || isAddingProfile}
                aria-invalid={errors.passwordConfirm ? "true" : "false"}
                {...register("passwordConfirm", {
                  required: true,
                  validate: (value) => value === getValues().password,
                })}
                $error={errors.passwordConfirm}
              />
            </SignUpGridItem>
          </SignUpGridContainer>

          <LoginFormErrorContainer>
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
          </LoginFormErrorContainer>

          <Button
            disabled={isGettingProfile || isSigningUp || isAddingProfile}
            isLight={false}
          >
            Sign Up
          </Button>
        </StyledSignupForm>
      )}
    </>
  );
}

export default SignupForm;
