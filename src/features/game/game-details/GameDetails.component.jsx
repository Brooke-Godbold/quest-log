import { useParams } from "react-router-dom";

import { useGame } from "./useGame";

import Spinner from "../../../ui/spinner/Spinner";
import {
  GameDetailsDescription,
  GameDetailsImage,
  GameDetailsImageContainer,
  GameDetailsInformation,
  GameDetailsReleaseYear,
  GameDetailsTitle,
  StyledGameDetails,
} from "./GameDetails.styles";
import Button from "../../../ui/button/Button.component";

function GameDetails() {
  const { id } = useParams();
  const { gameData, isFetching } = useGame(id);

  if (!gameData || isFetching) return <Spinner />;

  return (
    <StyledGameDetails>
      <GameDetailsImageContainer>
        <GameDetailsImage src={gameData.imageUrl} />
      </GameDetailsImageContainer>
      <GameDetailsInformation>
        <GameDetailsTitle>{gameData.name}</GameDetailsTitle>
        <GameDetailsReleaseYear>{gameData.releaseYear}</GameDetailsReleaseYear>
        <GameDetailsDescription>{gameData.description}</GameDetailsDescription>
        {gameData.publisherSite ? (
          <Button isLight={false} isLink={true} href={gameData.publisherSite}>
            Visit Publisher
          </Button>
        ) : null}
      </GameDetailsInformation>
    </StyledGameDetails>
  );
}

export default GameDetails;
