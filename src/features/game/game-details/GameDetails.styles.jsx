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

const GameDetailsDescription = styled.p``;

const AddHintButton = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  margin: 2rem;
  padding: 1rem 2rem;
  font-size: 2rem;
  border: none;
  background-color: #bbb;
  transition: all 0.3s;

  &:hover {
    background-color: #999;
  }
`;

const PublisherButton = styled.a`
  display: inline-block;
  background-color: #333;
  color: #ddd;
  padding: 1rem 2rem;
  margin-top: 5rem;
  font-size: 1.8rem;
  transition: all 0.3s;

  &:active,
  &:hover {
    background-color: #222;
  }
`;

export {
  StyledGameDetails,
  GameDetailsImage,
  GameDetailsInformation,
  GameDetailsTitle,
  GameDetailsReleaseYear,
  GameDetailsDescription,
  AddHintButton,
  PublisherButton,
};
