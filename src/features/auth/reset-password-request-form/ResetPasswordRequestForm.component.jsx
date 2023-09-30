import PropTypes from 'prop-types';

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { useResetPasswordRequest } from '../../../query/auth/useResetPasswordRequest';

import Button from '../../../ui/button/Button.component';
import Notification from '../../../ui/notification/Notification.component';

import {
  EmailInputRow,
  StyledResetPasswordRequestForm,
} from './ResetPasswordRequestForm.styles';
import { LoginHeading, LoginModalButton } from '../login-form/LoginForm.styles';
import { FormInput } from '../../../ui/FormInput/FormInput.styles';
import { useCaptcha } from '../../../contexts/CaptchaContext';
import Captcha from '../../../ui/captcha/Captcha.component';
import { useCallback, useEffect, useState } from 'react';

function ResetPasswordRequestForm({ setIsResetPassword }) {
  const { register, handleSubmit, reset } = useForm();

  const { captchaToken, executeCaptcha, resetCaptcha } = useCaptcha();

  const [emailData, setEmailData] = useState(null);
  const { forgottenPassword, isLoading } = useResetPasswordRequest();

  function onSubmit(data) {
    setEmailData(data);

    executeCaptcha();
  }

  const onResetPasswordRequest = useCallback(() => {
    forgottenPassword(
      { email: emailData.email, captchaToken },
      {
        onSuccess: () =>
          toast(() => (
            <Notification text="A password reset email has been sent to this email!" />
          )),
        onError: () =>
          toast.error(() => (
            <Notification text="Unable to reset password at this time" />
          )),
        onSettled: () => {
          reset();
          resetCaptcha();
        },
      }
    );
  }, [captchaToken, emailData, forgottenPassword, reset, resetCaptcha]);

  function onLogin(e) {
    e.preventDefault();
    setIsResetPassword(false);
  }

  useEffect(() => {
    if (!captchaToken) return;

    onResetPasswordRequest();
  }, [captchaToken, onResetPasswordRequest]);

  return (
    <StyledResetPasswordRequestForm onSubmit={handleSubmit(onSubmit)}>
      <LoginHeading>Password Reset</LoginHeading>
      <EmailInputRow>
        <label>Email</label>
        <FormInput {...register('email', { required: true })} />
      </EmailInputRow>
      <Captcha mode="invisible" />
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
