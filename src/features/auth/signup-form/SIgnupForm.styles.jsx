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
    gap: 4.8rem;
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

  @media (max-height: 55em) {
    gap: 1.2rem;
  }
`;

const SignUpGridItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  column-gap: 4.8rem;

  @media (max-width: 30em) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.8rem;

    & p {
      margin-right: 3.8rem;
    }
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

const CurrentlyPlayingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  width: 100%;

  @media (max-width: 35em) {
    width: 80%;
  }
`;

export {
  StyledSignupForm,
  SignupHeading,
  SignupSuccessContainer,
  SignupSuccessText,
  SignUpGridItem,
  SignUpGridContainer,
  CurrentlyPlayingContainer,
};
