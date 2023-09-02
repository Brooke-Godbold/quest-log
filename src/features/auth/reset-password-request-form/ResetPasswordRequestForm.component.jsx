import PropTypes from "prop-types";

import { useForm } from "react-hook-form";

import { useResetPasswordRequest } from "../../../query/auth/useResetPasswordRequest";

import Button from "../../../ui/button/Button.component";

import {
  EmailInputRow,
  PasswordResetResultContainer,
  StyledResetPasswordRequestForm,
} from "./ResetPasswordRequestForm.styles";
import { LoginHeading, LoginModalButton } from "../login-form/LoginForm.styles";
import { FormError } from "../../../ui/form-error/FormError.styles";
import { FormSuccess } from "../../../ui/form-success/FormSuccess.styles";
import { FormInput } from "../../../ui/FormInput/FormInput.styles";

function ResetPasswordRequestForm({ setIsResetPassword }) {
  const { register, handleSubmit, reset } = useForm();

  const { forgottenPassword, isLoading, isError, isSuccess } =
    useResetPasswordRequest();

  function onResetPasswordRequest(data) {
    forgottenPassword(data.email, { onSuccess: () => reset() });
  }

  function onLogin(e) {
    e.preventDefault();
    setIsResetPassword(false);
  }

  return (
    <StyledResetPasswordRequestForm
      onSubmit={handleSubmit(onResetPasswordRequest)}
    >
      <LoginHeading>Password Reset</LoginHeading>
      <EmailInputRow>
        <label>Email</label>
        <FormInput {...register("email", { required: true })} />
      </EmailInputRow>
      <PasswordResetResultContainer>
        {isError && <FormError>Oops! Something went wrong!</FormError>}
        {isSuccess && (
          <FormSuccess>
            A password reset email has been sent to this email!
          </FormSuccess>
        )}
      </PasswordResetResultContainer>
      <Button disabled={isLoading} isLight={true}>
        Request Password Reset
      </Button>
      <LoginModalButton onClick={onLogin}>Back to Login</LoginModalButton>
    </StyledResetPasswordRequestForm>
  );
}

ResetPasswordRequestForm.propTypes = {
  setIsResetPassword: PropTypes.func.isRequired,
};

export default ResetPasswordRequestForm;
