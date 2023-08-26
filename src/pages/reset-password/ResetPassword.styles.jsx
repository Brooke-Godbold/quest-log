import { styled } from "styled-components";

const StyledResetPassword = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-brand-100);
`;

const ResetPasswordHeading = styled.h1`
  font-size: 5.4rem;
  margin-bottom: 8.4rem;

  @media (max-width: 45em) {
    font-size: 3.6rem;
    text-align: center;
  }
`;

export { StyledResetPassword, ResetPasswordHeading };
