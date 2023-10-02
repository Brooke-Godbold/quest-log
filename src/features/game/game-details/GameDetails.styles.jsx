import { styled } from 'styled-components';
import { CommonButton } from '../../../styles/GlobalStyles';

const StyledGameDetails = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: auto auto;
  column-gap: 5rem;
  justify-content: center;
  align-items: center;

  background-color: var(--color-brand-500);
  padding: 2rem;
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border-radius: 7px;

  padding-right: 25rem;

  @media (max-width: 150em) {
    padding: 2rem 5rem;
  }

  @media (max-width: 100em) {
    column-gap: 2.4rem;

    display: ${(props) => (props.$detailsActive ? 'grid' : 'none')};
    grid-template-columns: 1.5fr 2.5fr;
  }

  @media (max-width: 45em) {
    display: ${(props) => (props.$detailsActive ? 'flex' : 'none')};
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const GameDetailsImageContainer = styled.div`
  padding: 2rem;
  justify-content: center;
  align-content: center;

  height: 100%;
  position: relative;
  overflow: hidden;

  grid-row: 1 / -1;

  @media (max-width: 100em) {
    grid-row: 1;
  }

  @media (max-width: 45em) {
    display: none;
  }
`;

const GameDetailsImage = styled.img`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 80%;
  border: double 7px rgba(34, 34, 34, 0.5);
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

const GameDetailsHeader = styled.div`
  margin-top: 1rem;

  display: flex;
  flex-direction: column;
`;

const GameDetailsInformation = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 100em) {
    grid-column: 1 / -1;
  }
`;

const GameDetailsTitle = styled.h1`
  font-size: 4.8rem;
  margin-bottom: 0.5rem;

  @media (max-width: 25em) {
    font-size: xx-large;
  }
`;

const GameDetailsReleaseYear = styled.h3`
  margin-bottom: 1.2rem;
`;

const GamePlatformTagContainer = styled.div`
  display: flex;
  gap: 0.8rem;

  flex-wrap: wrap;

  margin-bottom: 3.6rem;
`;

const GamePlatformTag = styled.span`
  border-radius: 5px;
  padding: 0.4rem 1.2rem;

  background-color: var(--color-brand-700);
  color: var(--color-brand-200);

  flex-shrink: 0;

  font-size: 1.4rem;

  @media (max-width: 100em) {
    font-size: 1.2rem;
  }
`;

const GameDetailsDescription = styled.p`
  margin-bottom: 3rem;
`;

const GameButtonsContainer = styled.div`
  display: flex;
  gap: 1.2rem;

  @media (max-width: 40em) {
    flex-direction: column;
  }
`;

const GameButton = styled.button`
  ${CommonButton}

  gap: 1.2rem;

  background-color: ${(props) =>
    props.$isPlaying ? 'var(--color-brand-800)' : 'var(--color-brand-400)'};

  color: ${(props) =>
    props.$isPlaying ? 'var(--color-brand-50)' : 'var(--color-brand-700)'};

  &:hover {
    background-color: ${(props) =>
      props.$isPlaying ? 'var(--color-brand-400)' : 'var(--color-brand-800)'};

    color: ${(props) =>
      props.$isPlaying ? 'var(--color-brand-700)' : 'var(--color-brand-50)'};
  }
`;

const CurrentlyPlayingCount = styled.div`
  border-radius: 5px;
  border: 2px solid var(--color-brand-700);

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.2rem;

  & p {
    text-align: center;
  }

  @media (max-width: 40em) {
    padding: 1.2rem;
  }
`;

export {
  StyledGameDetails,
  GameDetailsImage,
  GameDetailsHeader,
  GameDetailsInformation,
  GameDetailsTitle,
  GameDetailsReleaseYear,
  GameDetailsDescription,
  GameDetailsImageContainer,
  GamePlatformTagContainer,
  GamePlatformTag,
  GameButtonsContainer,
  GameButton,
  CurrentlyPlayingCount,
};
