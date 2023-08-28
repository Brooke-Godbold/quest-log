import PropTypes from "prop-types";

import {
  CurrentlyPlaying,
  CurrentlyPlayingButton,
  StyledCurrentlyPlayingRow,
} from "./CurrentlyPlayingRow.styles";
import { HiMinus, HiPlus } from "react-icons/hi";

function CurrentlyPlayingRow({
  gameId,
  gameData,
  rowIndex,
  isLoading,
  currentlyPlaying,
  register,
  addNewCurrentlyPlaying,
  removeCurrentlyPlaying,
  availableGames,
}) {
  return (
    <StyledCurrentlyPlayingRow key={`currentlyPlaying_${gameId}`}>
      <CurrentlyPlaying
        disabled={isLoading}
        value={
          gameId
            ? gameData.filter((game) => game.id === gameId)[0].name
            : "placeholder"
        }
        id={`currentlyPlaying_${rowIndex}`}
        {...register(`currentlyPlaying_${rowIndex}`)}
      >
        <option key="placeholder" value="placeholder">
          Please Select...
        </option>
        {gameId && (
          <option
            key={gameData.filter((data) => data.id === gameId)[0].name}
            value={gameData.filter((data) => data.id === gameId)[0].name}
          >
            {gameData.filter((data) => data.id === gameId)[0].name}
          </option>
        )}

        {availableGames
          .filter(
            (availableGame) =>
              !currentlyPlaying.includes(
                gameData.filter((data) => data.name === availableGame)[0].id
              )
          )
          .map((game) => (
            <option key={game} value={game}>
              {game}
            </option>
          ))}
      </CurrentlyPlaying>

      {currentlyPlaying.length <= 3 && !currentlyPlaying.includes(null) && (
        <CurrentlyPlayingButton onClick={addNewCurrentlyPlaying}>
          <HiPlus />
        </CurrentlyPlayingButton>
      )}

      {currentlyPlaying.length > 1 && (
        <CurrentlyPlayingButton
          onClick={(e) => removeCurrentlyPlaying(e, gameId)}
        >
          <HiMinus />
        </CurrentlyPlayingButton>
      )}
    </StyledCurrentlyPlayingRow>
  );
}

CurrentlyPlayingRow.propTypes = {
  gameId: PropTypes.number,
  gameData: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  currentlyPlaying: PropTypes.array.isRequired,
  register: PropTypes.func.isRequired,
  addNewCurrentlyPlaying: PropTypes.func.isRequired,
  removeCurrentlyPlaying: PropTypes.func.isRequired,
  availableGames: PropTypes.array.isRequired,
};

export default CurrentlyPlayingRow;
