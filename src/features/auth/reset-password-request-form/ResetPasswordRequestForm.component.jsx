import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { useResetPasswordRequest } from "../../../query/auth/useResetPasswordRequest";

import Button from "../../../ui/button/Button.component";
import Notification from "../../../ui/notification/Notification.component";

import {
  EmailInputRow,
  StyledResetPasswordRequestForm,
} from "./ResetPasswordRequestForm.styles";
import { LoginHeading, LoginModalButton } from "../login-form/LoginForm.styles";
import { FormInput } from "../../../ui/FormInput/FormInput.styles";

function ResetPasswordRequestForm({ setIsResetPassword }) {
  const { register, handleSubmit, reset } = useForm();

  const { forgottenPassword, isLoading } = useResetPasswordRequest();

  function onResetPasswordRequest(data) {
    forgottenPassword(data.email, {
      onSuccess: () =>
        toast(() => (
          <Notification text="A password reset email has been sent to this email!" />
        )),
      onError: () =>
        toast.error(() => (
          <Notification text="Unable to reset password at this time" />
        )),
      onSettled: () => reset(),
    });
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
