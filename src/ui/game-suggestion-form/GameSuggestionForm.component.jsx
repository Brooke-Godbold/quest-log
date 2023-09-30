import PropTypes from 'prop-types';

import Button from '../button/Button.component';
import Modal from '../modal/Modal.component';
import {
  GameSuggestionInput,
  GameSuggestionSection,
  StyledGameSuggestionForm,
} from './GameSuggestionForm.styles';
import { useForm } from 'react-hook-form';
import { onErrorToast } from '../../utils/onErrorToast';
import toast from 'react-hot-toast';
import Notification from '../notification/Notification.component';
import { useAddGame } from '../../query/game/useAddGame';
import { filterWhiteSpace } from '../../utils/filterWhiteSpace';
import { format } from 'date-fns';
import { GameSelect } from '../game-select/GameSelect.styles';
import { useEffect } from 'react';

function GameSuggestion({ children, searchQuery }) {
  return (
    <Modal>
      <Modal.Open opens="gameSuggestion">{children}</Modal.Open>
      <Modal.Window name="gameSuggestion">
        <GameSuggestionForm searchQuery={searchQuery} />
      </Modal.Window>
    </Modal>
  );
}

GameSuggestion.propTypes = {
  children: PropTypes.node.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

function GameSuggestionForm({ onCloseModal, searchQuery }) {
  const { addGame, isLoading } = useAddGame();

  const { handleSubmit, register, reset, setFocus } = useForm();

  function handleAddSuggestion(e) {
    addGame(
      { name: e.gameName, releaseYear: e.releaseYear, isVisible: false },
      {
        onError: () => {
          toast.error(() => (
            <Notification text="We were unable to submit your suggestion, please try again" />
          ));
        },
        onSuccess: () => {
          onCloseModal?.();
          toast(() => (
            <Notification text="Your suggestion has been submitted" />
          ));
        },
      }
    );
  }

  useEffect(() => {
    setFocus('gameName');
  }, [setFocus]);

  return (
    <StyledGameSuggestionForm
      onSubmit={handleSubmit(handleAddSuggestion, (e) =>
        onErrorToast(e, null, reset)
      )}
    >
      <h2>Suggest a Game</h2>
      <GameSuggestionSection>
        <label>Name</label>
        <GameSuggestionInput
          id="gameName"
          {...register('gameName', {
            required: {
              value: true,
              message: 'Game name cannot be empty!',
            },
            validate: (value) =>
              filterWhiteSpace(value)?.length !== 0 ||
              'Game name cannot be empty!',
          })}
          defaultValue={searchQuery}
          disabled={isLoading}
        />
      </GameSuggestionSection>
      <GameSuggestionSection>
        <label>Release Year</label>
        <GameSelect
          id="releaseYear"
          {...register('releaseYear', {
            validate: (value) =>
              value !== '' || 'Please select a release year!',
          })}
        >
          <option value="">Select year...</option>
          {arrayRange(1965, format(new Date(), 'y'), 1).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </GameSelect>
      </GameSuggestionSection>
      <Button disabled={isLoading}>Submit</Button>
    </StyledGameSuggestionForm>
  );
}

GameSuggestionForm.propTypes = {
  onCloseModal: PropTypes.func,
  searchQuery: PropTypes.string.isRequired,
};

const arrayRange = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );

export default GameSuggestion;
