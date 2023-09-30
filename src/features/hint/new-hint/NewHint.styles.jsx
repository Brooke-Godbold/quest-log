import { styled } from 'styled-components';
import { CommonTextArea } from '../../../styles/GlobalStyles';

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
  ${CommonTextArea}

  height: 20rem;
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
