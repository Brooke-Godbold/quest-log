import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import { useGame } from "./useGame";

import Spinner from "../../../ui/spinner/Spinner";
import {
  AddHintButton,
  GameDetailsDescription,
  GameDetailsImage,
  GameDetailsInformation,
  GameDetailsReleaseYear,
  GameDetailsTitle,
  PublisherButton,
  StyledGameDetails,
} from "./GameDetails.styles";

function GameDetails({ handleAddHint }) {
  const { id } = useParams();
  const { gameData, isFetching } = useGame(id);

  if (!gameData || isFetching) return <Spinner />;

  return (
    <StyledGameDetails>
      <GameDetailsImage src={gameData.imageUrl} />
      <GameDetailsInformation>
        <GameDetailsTitle>{gameData.name}</GameDetailsTitle>
        <GameDetailsReleaseYear>{gameData.releaseYear}</GameDetailsReleaseYear>
        <GameDetailsDescription>{gameData.description}</GameDetailsDescription>
        {gameData.publisherSite ? (
          <PublisherButton href={gameData.publisherSite} target="_blank">
            Visit Publisher
          </PublisherButton>
        ) : null}
      </GameDetailsInformation>
      <AddHintButton onClick={handleAddHint}>Add Hint</AddHintButton>
    </StyledGameDetails>
  );
}

GameDetails.propTypes = {
  handleAddHint: PropTypes.func.isRequired,
};

export default GameDetails;
