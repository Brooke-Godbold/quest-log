import { styled } from "styled-components";

const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const LoginHeading = styled.h2`
  margin-bottom: 2rem;
`;

const FormInputTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: ${(props) => `repeat(${props.$rows}, 1fr)`};
  gap: 2rem;
  font-size: 2rem;
  align-items: center;
`;

const FormInput = styled.input`
  padding: 1rem 2rem;
  border-radius: 4px;
  border: none;
  color: #888;
  width: 50rem;

  &::placeholder {
    color: #bbb;
  }
`;

const FormLabel = styled.label``;

const FormErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const FormError = styled.span`
  font-size: 1.6rem;
  padding: 0.5rem;
  background-color: rgb(255, 84, 84, 0.7);
  border: 1px solid red;
  border-radius: 3px;
  color: #ffdfdf;
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
  FormInputTable,
  LoginHeading,
  FormLabel,
  FormInput,
  FormErrorContainer,
  FormError,
  LoginButtonsContainer,
};
