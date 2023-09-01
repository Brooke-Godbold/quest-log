import PropTypes from "prop-types";

import { useParams } from "react-router-dom";

import { useGame } from "../../../query/game/useGame";

import Spinner from "../../../ui/spinner/Spinner";
import Button from "../../../ui/button/Button.component";

import {
  GameDetailsDescription,
  GameDetailsImage,
  GameDetailsImageContainer,
  GameDetailsInformation,
  GameDetailsReleaseYear,
  GameDetailsTitle,
  StyledGameDetails,
} from "./GameDetails.styles";

function GameDetails({ detailsActive }) {
  const { id } = useParams();
  const { gameData, isFetching } = useGame(id);

  return (
    <StyledGameDetails $detailsActive={detailsActive}>
      {!gameData || isFetching ? (
        <Spinner />
      ) : (
        <>
          <GameDetailsImageContainer>
            <GameDetailsImage src={gameData.imageUrl} />
          </GameDetailsImageContainer>
          <GameDetailsInformation>
            <GameDetailsTitle>{gameData.name}</GameDetailsTitle>
            <GameDetailsReleaseYear>
              {gameData.releaseYear}
            </GameDetailsReleaseYear>
            <GameDetailsDescription>
              {gameData.description}
            </GameDetailsDescription>
            {gameData.publisherSite ? (
              <Button
                isLight={false}
                isLink={true}
                href={gameData.publisherSite}
              >
                Visit Publisher
              </Button>
            ) : null}
          </GameDetailsInformation>
        </>
      )}
    </StyledGameDetails>
  );
}

GameDetails.propTypes = {
  detailsActive: PropTypes.bool.isRequired,
};

export default GameDetails;
