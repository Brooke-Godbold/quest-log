import { styled } from "styled-components";

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;

  height: 100%;

  @media (max-width: 120em) {
    width: 100%;
  }
`;

const LoginHeading = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 3.6rem;
`;

const LoginFormInputTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: ${(props) => `repeat(${props.$rows}, 1fr)`};
  gap: 2rem;
  font-size: 2rem;
  align-items: center;
  width: 75%;

  @media (max-width: 65em) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 35em) {
    width: 100%;
    align-items: center;
  }
`;

const LoginFormErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const LoginModalButton = styled.button`
  border: none;
  background-color: transparent;
`;

const LoginButtonsContainer = styled.div`
  display: flex;
  gap: 6.4rem;
  justify-content: center;
  width: 80%;

  & button {
    width: 30%;
  }

  @media (max-width: 65em) {
    & button {
      width: 100%;
      font-size: 1.6rem;
    }
  }

  @media (max-width: 35em) {
    width: 75%;
  }
`;

export {
  StyledLoginForm,
  LoginFormInputTable,
  LoginHeading,
  LoginFormErrorContainer,
  LoginButtonsContainer,
  LoginModalButton,
};
