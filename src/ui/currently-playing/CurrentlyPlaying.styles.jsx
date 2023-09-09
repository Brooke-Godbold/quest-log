import styled from 'styled-components';
import { CommonInput, CommonScrollBar } from '../../styles/GlobalStyles';

const StyledCurrentlyPlaying = styled.div`
  position: relative;

  width: 100%;

  @media (max-width: 35em) {
    width: 80%;
  }
`;

const CurrentlyPlayingInput = styled.input`
  ${CommonInput}

  padding: 1rem 2rem;
  width: 100%;

  border: ${(props) =>
    props.$error ? '3px solid var(--color-red-600)' : 'none'};

  &::placeholder {
    color: ${(props) =>
      props.$inputPopulated
        ? 'var(--color-brand-600)'
        : 'var(--color-brand-400)'};
  }

  @media (max-width: 35em) {
    width: 80%;
  }
`;

const CurrentlyPlayingSearchInput = styled.input`
  ${CommonInput}

  padding: 1rem 2rem;
  width: 100%;

  border: ${(props) =>
    props.$error ? '3px solid var(--color-red-600)' : 'none'};
`;

const CurrentlyPlayingSuggestions = styled.div`
  background-color: var(--color-brand-400);

  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  position: absolute;
  top: 100%;
  left: 0;
  right: 0;

  max-height: 20rem;

  display: flex;
  flex-direction: column;

  ${CommonScrollBar}
  overflow: auto;

  z-index: 990;

  transition: all 0.3s;

  transform-origin: top center;
  transform: ${(props) => (props.$active ? 'scaleY(100%)' : 'scaleY(0)')};
`;

const CurrentlyPlayingSelection = styled.button`
  border: none;

  flex-shrink: 0;
  width: 100%;
  padding: 1.2rem;

  background-color: transparent;

  transition: all 0.3s;

  &:hover {
    background-color: var(--color-brand-200);
  }
`;

export {
  StyledCurrentlyPlaying,
  CurrentlyPlayingSearchInput,
  CurrentlyPlayingSuggestions,
  CurrentlyPlayingSelection,
  CurrentlyPlayingInput,
};
