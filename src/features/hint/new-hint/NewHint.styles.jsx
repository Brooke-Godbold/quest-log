import { styled } from "styled-components";

const StyledNewHint = styled.form`
  z-index: 1;
  padding: 4.8rem;

  @media (max-width: 50em) {
    padding: 2.4rem;
  }

  @media (max-width: 25em) {
    padding: 2.4rem 0;
  }
`;

const NewHintHeader = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 50em) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const NewHintButtonsContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const NewHintBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const NewHintTextArea = styled.textarea`
  margin-top: 3rem;
  padding: 1.5rem 2rem;
  width: 100%;
  height: 20rem;
  border: none;
  box-shadow: inset 0 0 1rem rgb(17, 17, 17, 0.2);
  border: 4px solid transparent;

  &:focus {
    outline: none;
    border: 4px solid rgb(17, 17, 17, 0.4);
  }
`;

const NewHintTagsContainer = styled.div`
  display: flex;

  & *:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  & *:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

export {
  StyledNewHint,
  NewHintTextArea,
  NewHintHeader,
  NewHintTagsContainer,
  NewHintButtonsContainer,
  NewHintBody,
};
