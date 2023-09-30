import styled from 'styled-components';
import { CommonInput } from '../../styles/GlobalStyles';

const StyledGameSuggestionForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3.6rem;

  width: 20vw;

  @media (max-width: 120em) {
    width: 40vw;
  }

  @media (max-width: 75em) {
    width: 60vw;
  }

  @media (max-width: 35em) {
    width: 80vw;
  }
`;

const GameSuggestionInput = styled.input`
  ${CommonInput}

  width: 100%;
  padding: 1.6rem;
`;

const GameSuggestionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & select {
    width: 100%;
  }
`;

export { StyledGameSuggestionForm, GameSuggestionInput, GameSuggestionSection };
