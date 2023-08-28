import styled from "styled-components";
import { CommonButton, CommonScrollBar } from "../../../styles/GlobalStyles";

const StyledAddPostForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5.4rem;
  width: 75rem;
`;

const AddPostHeader = styled.div`
  margin-top: 3.2rem;
  display: flex;
  justify-content: space-between;
  width: 95%;

  & h3 {
    font-size: 3.6rem;
  }
`;

const AddPostGame = styled.select`
  padding: 1rem 2rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-brand-50);
  color: var(--color-brand-600);
  width: 50%;
`;

const AddPostTextSection = styled.div`
  width: 100%;
  height: 25rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const AddPostTextArea = styled.textarea`
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border-radius: 7px;
  background-color: var(--color-brand-100);
  color: var(--color-brand-700);
  padding: 3.2rem;
  width: 100%;
  height: 100%;

  ${CommonScrollBar}
`;

const AddPostTextCount = styled.p`
  font-size: 1.4rem;
  align-self: flex-end;
  margin-right: 1.6rem;
`;

const AddPostButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 12.8rem;
`;

const AddPostCancelButton = styled.button`
  ${CommonButton}

  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border-radius: 5px;
  background-color: var(--color-red-600);

  &:hover {
    background-color: var(--color-red-800);
  }
`;

const AddPostErrorContainer = styled.div`
  display: flex;
  gap: 0.8rem;
`;

export {
  StyledAddPostForm,
  AddPostHeader,
  AddPostTextArea,
  AddPostButtons,
  AddPostCancelButton,
  AddPostGame,
  AddPostErrorContainer,
  AddPostTextSection,
  AddPostTextCount,
};