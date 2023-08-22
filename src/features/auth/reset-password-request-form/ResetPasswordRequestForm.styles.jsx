import { styled } from "styled-components";

const StyledResetPasswordRequestForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const EmailInputRow = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 2rem;
  align-items: center;
  margin-bottom: 3rem;
`;

const PasswordResetResultContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export {
  StyledResetPasswordRequestForm,
  EmailInputRow,
  PasswordResetResultContainer,
};
