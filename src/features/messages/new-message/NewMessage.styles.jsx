import { styled } from "styled-components";
import { CommonButton, CommonScrollBar } from "../../../styles/GlobalStyles";

const StyledNewMessage = styled.form`
  padding: 2.4rem;

  width: 100%;
  height: 17.5%;
  background-color: var(--color-brand-400);
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);

  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;

  display: flex;

  @media (max-width: 55em) {
    padding: 1.2rem;
  }

  @media (max-width: 40em) {
    height: 20%;
  }
`;

const NewMessageTextArea = styled.textarea`
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border: none;
  border-radius: 3px;
  background-color: var(--color-brand-50);
  color: var(--color-brand-600);
  padding: 1.6rem;

  flex: 1;

  ${CommonScrollBar}
`;

const SendMessageButton = styled.button`
  ${CommonButton}

  padding: 1rem 3rem;

  @media (max-width: 25em) {
    padding: 1rem 1.5rem;
  }
`;

export { StyledNewMessage, NewMessageTextArea, SendMessageButton };
