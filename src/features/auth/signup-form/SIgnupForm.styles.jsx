import { styled } from "styled-components";

const StyledSignupForm = styled.form`
  background-color: #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10rem;
  height: 100vh;
`;

const SignupHeading = styled.h1`
  font-size: 7.4rem;
`;

const SignupSuccessContainer = styled.div`
  background-color: #ddd;
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
