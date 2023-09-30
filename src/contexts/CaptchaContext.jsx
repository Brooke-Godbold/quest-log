import PropTypes from 'prop-types';

import { useContext, useRef } from 'react';
import { createContext, useState } from 'react';

const CaptchaContext = createContext();

function CaptchaProvider({ children }) {
  const [captchaToken, setCaptchaToken] = useState();
  const captcha = useRef();

  function executeCaptcha() {
    captcha.current?.execute();
  }

  function resetCaptcha() {
    setCaptchaToken(null);
    captcha.current?.resetCaptcha();
  }

  return (
    <CaptchaContext.Provider
      value={{
        captchaToken,
        setCaptchaToken,
        captcha,
        executeCaptcha,
        resetCaptcha,
      }}
    >
      {children}
    </CaptchaContext.Provider>
  );
}

function useCaptcha() {
  const context = useContext(CaptchaContext);

  if (context === undefined) {
    throw new Error(
      'CaptchaContext used outside of the CaptchaProvider element'
    );
  }

  return context;
}

export { useCaptcha, CaptchaProvider };

CaptchaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
