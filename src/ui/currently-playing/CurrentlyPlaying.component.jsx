import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useSearchGames } from '../../query/game/useSearchGames';
import { useGame } from '../../query/game/useGame';

import { MiniSpinner } from '../spinner/Spinner';
import GameSuggestion from '../game-suggestion-form/GameSuggestionForm.component';

import {
  CurrentlyPlayingInput,
  CurrentlyPlayingSelection,
  CurrentlyPlayingSuggestions,
  InfoContainer,
  InfoText,
  StyledCurrentlyPlaying,
} from './CurrentlyPlaying.styles';

function CurrentlyPlaying({
  setCurrentlyPlayingIds,
  currentId,
  currentlyPlayingList = [],
}) {
  const location = useLocation();

  const [gameQuery, setGameQuery] = useState('');
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  const { gameData, isLoading } = useSearchGames(gameQuery);
  const { gameData: game } = useGame(currentId);

  function setQuery(e) {
    setGameQuery(e.target.value);
  }

  function updateCurrentlyPlaying(e, gameName) {
    e.preventDefault();

    const oldGame = currentlyPlaying;
    const newGame = gameData.find((game) => game.name === gameName);

    setGameQuery('');

    setCurrentlyPlayingIds((currentlyPlayingIds) =>
      currentlyPlayingIds.length > 0
        ? currentlyPlayingIds.map((id) =>
            !id || id === oldGame?.id ? newGame.id : id
          )
        : [newGame.id]
    );
  }

  useEffect(() => {
    setCurrentlyPlaying(game);
  }, [game]);

  return (
    <StyledCurrentlyPlaying>
      <CurrentlyPlayingInput
        onBlur={() => setGameQuery('')}
        autoComplete="off"
        id="currentlyPlaying"
        value={gameQuery}
        onChange={setQuery}
        placeholder={currentlyPlaying?.name || 'playing something new?'}
        $inputPopulated={currentlyPlaying?.name}
      />
      <CurrentlyPlayingSuggestions $active={gameQuery?.length > 2}>
        {gameData?.filter((game) => game.isVisible && game.isReleased).length >
        0 ? (
          gameData.map(
            (game) =>
              !currentlyPlayingList.includes(game.id) && (
                <CurrentlyPlayingSelection
                  key={game.id}
                  onMouseDown={(e) => updateCurrentlyPlaying(e, game.name)}
                >
                  {game.name}
                </CurrentlyPlayingSelection>
              )
          )
        ) : isLoading ? (
          <InfoContainer>
            <InfoText>Searching...</InfoText>
            <MiniSpinner />
          </InfoContainer>
        ) : !location.pathname.includes('signup') ? (
          <GameSuggestion searchQuery={gameQuery}>
            <CurrentlyPlayingSelection onClick={(e) => e.preventDefault()}>
              We couldn&apos;t find anything for that, try another search?
            </CurrentlyPlayingSelection>
          </GameSuggestion>
        ) : (
          <InfoText>
            We couldn&apos;t find anything for that, try another search?
          </InfoText>
        )}
      </CurrentlyPlayingSuggestions>
    </StyledCurrentlyPlaying>
  );
}

CurrentlyPlaying.propTypes = {
  setCurrentlyPlayingIds: PropTypes.func.isRequired,
  currentId: PropTypes.number,
  currentlyPlayingList: PropTypes.array,
};

export default CurrentlyPlaying;
