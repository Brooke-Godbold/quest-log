import { styled } from "styled-components";

const StyledGameDetails = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 5rem;
  justify-content: center;
  align-items: center;
  background-color: var(--color-brand-500);
  padding: 2rem;

  @media (max-width: 75em) {
    display: ${(props) => (props.$detailsActive ? "grid" : "none")};
    grid-template-columns: 1.5fr 2.5fr;
  }

  @media (max-width: 45em) {
    display: ${(props) => (props.$detailsActive ? "flex" : "none")};
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

  @media (max-width: 45em) {
    display: none;
  }
`;

const GameDetailsImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
  aspect-ratio: 1 / 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const GameDetailsInformation = styled.div`
  margin-top: 1rem;
  margin-right: 50rem;

  @media (max-width: 150em) {
    margin-right: 5rem;
  }

  @media (max-width: 45em) {
    margin-right: 0;
  }
`;

const GameDetailsTitle = styled.h1`
  font-size: 4.8rem;
  margin-bottom: 0.5rem;
`;

const GameDetailsReleaseYear = styled.h3`
  margin-bottom: 5rem;
`;

const GameDetailsDescription = styled.p`
  margin-bottom: 3rem;
`;

export {
  StyledGameDetails,
  GameDetailsImage,
  GameDetailsInformation,
  GameDetailsTitle,
  GameDetailsReleaseYear,
  GameDetailsDescription,
  GameDetailsImageContainer,
};
