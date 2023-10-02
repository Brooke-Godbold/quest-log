import PropTypes from 'prop-types';

import toast from 'react-hot-toast';

import HCaptcha from '@hcaptcha/react-hcaptcha';

import { useCaptcha } from '../../contexts/CaptchaContext';

import Notification from '../notification/Notification.component';

import { ComplianceStatement, StyledCaptcha } from './Captcha.styles';

function Captcha({ mode = 'normal' }) {
  const { setCaptchaToken, captcha } = useCaptcha();

  function verifyCaptcha(token) {
    setCaptchaToken(token);
  }

  function handleExpiredCaptcha() {
    captcha.current.resetCaptcha();
    setCaptchaToken(null);

    toast.error(() => (
      <Notification text="Your Captcha has expired, please re-verify" />
    ));
  }

  function handleCaptchaError() {
    captcha.current.resetCaptcha();
    setCaptchaToken(null);

    toast.error(() => (
      <Notification text="Oops! Something went wrong with verification, please try again" />
    ));
  }

  return (
    <>
      {mode !== 'invisible' ? (
        <StyledCaptcha>
          <HCaptcha
            ref={captcha}
            sitekey={import.meta.env.VITE_HCAPTCHA_KEY}
            onVerify={(token) => verifyCaptcha(token)}
            onExpire={handleExpiredCaptcha}
            onError={handleCaptchaError}
            size={mode}
          />
        </StyledCaptcha>
      ) : (
        <StyledCaptcha>
          <ComplianceStatement>
            This site is protected by hCaptcha and its{' '}
            <a
              href="https://www.hcaptcha.com/privacy"
              rel="noreferrer"
              target="_blank"
            >
              Privacy Policy
            </a>{' '}
            and{' '}
            <a
              href="https://www.hcaptcha.com/terms"
              rel="noreferrer"
              target="_blank"
            >
              Terms of Service
            </a>{' '}
            apply.
          </ComplianceStatement>
          <HCaptcha
            ref={captcha}
            sitekey={import.meta.env.VITE_HCAPTCHA_KEY}
            onVerify={(token) => verifyCaptcha(token)}
            onError={handleCaptchaError}
            size={mode}
          />
        </StyledCaptcha>
      )}
    </>
  );
}

Captcha.propTypes = {
  mode: PropTypes.string,
};

export default Captcha;
