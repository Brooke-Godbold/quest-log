import { styled } from "styled-components";

const StyledConfirmSignup = styled.div`
  background-color: var(--color-brand-100);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10rem;
  height: 100vh;
`;

const ConfirmSignupHeading = styled.h1`
  font-size: 7.4rem;

  @media (max-width: 45em) {
    font-size: 3.6rem;
    text-align: center;
  }
`;

export { StyledConfirmSignup, ConfirmSignupHeading };
