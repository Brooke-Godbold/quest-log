import { styled } from "styled-components";
import { CommonInput } from "../../../styles/GlobalStyles";

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
`;

const LoginFormInput = styled.input`
  ${CommonInput}

  padding: 1rem 2rem;
  width: 50rem;
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

  & button {
    width: 30%;
  }
`;

export {
  StyledLoginForm,
  LoginFormInputTable,
  LoginHeading,
  LoginFormInput,
  LoginFormErrorContainer,
  LoginButtonsContainer,
  LoginModalButton,
};
