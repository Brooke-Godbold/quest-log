import PropTypes from "prop-types";
import {
  EmailInputRow,
  PasswordResetResultContainer,
  StyledResetPasswordRequestForm,
} from "./ResetPasswordRequestForm.styles";
import {
  LoginFormInput,
  LoginHeading,
  LoginModalButton,
} from "../login-form/LoginForm.styles";
import { useForm } from "react-hook-form";
import Button from "../../../ui/button/Button.component";
import { useResetPasswordRequest } from "./useResetPasswordRequest";
import { FormError } from "../../../ui/form-error/FormError.styles";
import { FormSuccess } from "../../../ui/form-success/FormSuccess.styles";

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
        <LoginFormInput {...register("email", { required: true })} />
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
