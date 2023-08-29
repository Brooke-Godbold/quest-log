import { styled } from "styled-components";

const StyledSignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10rem;
  height: 100%;

  width: 50%;

  @media (max-width: 150em) {
    width: 75%;
  }

  @media (max-width: 65em) {
    gap: 2.4rem;
  }

  @media (max-width: 30em) {
    width: 100%;
  }
`;

const SignupHeading = styled.h1`
  font-size: 7.4rem;

  @media (max-width: 65em) {
    margin-bottom: 4.8rem;
  }

  @media (max-width: 25em) {
    font-size: 3.6rem;
  }
`;

const SignUpGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
  width: 75%;

  @media (max-width: 65em) {
    width: 100%;
  }
`;

const SignUpGridItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
  column-gap: 4.8rem;

  @media (max-width: 30em) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
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
  SignUpGridItem,
  SignUpGridContainer,
};
