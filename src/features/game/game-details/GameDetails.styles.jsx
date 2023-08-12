import { styled } from "styled-components";

const StyledGameDetails = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 5rem;
  justify-content: center;
  align-items: center;

  background-color: #ddd;
`;

const GameDetailsImage = styled.img`
  padding: 2rem;
  justify-self: center;
  align-self: center;
`;

const GameDetailsInformation = styled.div`
  align-self: self-start;
  margin-top: 5rem;
  margin-right: 50rem;
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
};
