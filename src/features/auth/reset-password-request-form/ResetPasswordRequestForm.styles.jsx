import { styled } from "styled-components";

const StyledResetPasswordRequestForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 3rem;
  gap: 2rem;
`;

const EmailInputRow = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 2rem;
  align-items: center;
  margin-bottom: 3rem;
  width: 75%;
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
