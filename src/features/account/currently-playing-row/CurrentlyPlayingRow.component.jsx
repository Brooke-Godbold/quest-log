import PropTypes from 'prop-types';

import {
  CurrentlyPlayingButton,
  StyledCurrentlyPlayingRow,
} from './CurrentlyPlayingRow.styles';
import { HiMinus, HiPlus } from 'react-icons/hi';
import CurrentlyPlaying from '../../../ui/currently-playing/CurrentlyPlaying.component';

function CurrentlyPlayingRow({
  gameId,
  setCurrentlyPlaying,
  currentlyPlaying,
  addNewCurrentlyPlaying,
  removeCurrentlyPlaying,
}) {
  return (
    <StyledCurrentlyPlayingRow key={`currentlyPlaying_${gameId}`}>
      <CurrentlyPlaying
        currentId={gameId}
        setCurrentlyPlayingIds={setCurrentlyPlaying}
        currentlyPlayingList={currentlyPlaying}
      />

      {currentlyPlaying?.length <= 2 && !currentlyPlaying.includes(null) && (
        <CurrentlyPlayingButton onClick={addNewCurrentlyPlaying}>
          <HiPlus />
        </CurrentlyPlayingButton>
      )}

      {currentlyPlaying?.length > 1 && (
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
  currentlyPlaying: PropTypes.array,
  addNewCurrentlyPlaying: PropTypes.func,
  removeCurrentlyPlaying: PropTypes.func,
  setCurrentlyPlaying: PropTypes.func,
};

export default CurrentlyPlayingRow;
