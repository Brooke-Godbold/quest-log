import { styled } from "styled-components";

const StyledNewHint = styled.form`
  z-index: 1;
  background-color: #999;
  width: 100%;
  padding: 1rem;
`;

const NewHintHeader = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const NewHintTextArea = styled.textarea`
  padding: 1.5rem 2rem;
  width: 100%;
  border: none;
  box-shadow: inset 0 0 1rem rgb(17, 17, 17, 0.2);
  border: 4px solid transparent;

  &:focus {
    outline: none;
    border: 4px solid rgb(17, 17, 17, 0.4);
  }
`;

const NewHintHeading = styled.h2``;

const NewHintButton = styled.button`
  font-size: 2.5rem;
  border: none;
  padding: 0 2rem;
  font-weight: 700;
  background-color: #bbb;
  border: 4px solid transparent;
  transition: all 0.3s;

  &:hover {
    background-color: #aaa;
  }

  &:focus,
  &:active {
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
  NewHintHeading,
  NewHintButton,
  NewHintHeader,
  NewHintTagsContainer,
};
