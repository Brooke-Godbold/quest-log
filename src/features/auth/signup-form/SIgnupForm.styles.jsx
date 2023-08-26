import { styled } from "styled-components";

const StyledSignupForm = styled.form`
  background-color: var(--color-brand-100);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10rem;
  height: 100vh;

  @media (max-width: 65em) {
    gap: 2.4rem;
  }
`;

const SignupHeading = styled.h1`
  font-size: 7.4rem;

  @media (max-width: 25em) {
    font-size: 3.6rem;
  }
`;

const SignupSuccessContainer = styled.div`
  background-color: var(--color-brand-100);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10rem;
  height: 100vh;
`;

const SignupSuccessText = styled.p``;

export {
  StyledSignupForm,
  SignupHeading,
  SignupSuccessContainer,
  SignupSuccessText,
};
