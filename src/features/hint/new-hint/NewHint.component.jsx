import PropTypes from 'prop-types';

import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { useAddHint } from '../../../query/hint/useAddHint';

import TagButton from '../tag-button/TagButton.component';
import Button from '../../../ui/button/Button.component';
import TextCount from '../../../ui/text-count/TextCount.component';
import Notification from '../../../ui/notification/Notification.component';

import {
  NewHintBody,
  NewHintButtonsContainer,
  NewHintHeader,
  NewHintTextArea,
  StyledNewHint,
} from './NewHint.styles';
import { StyledButtonContainer } from '../../../ui/button-container/ButtonContainer.styles';

import { HINT_MAX_LENGTH, HINT_MIN_LENGTH, TAGS } from '../../../data/consts';
import { onErrorToast } from '../../../utils/onErrorToast';

function NewHint({ onCloseModal, user: { id: userId } }) {
  const { id: gameId } = useParams();
  const { addHint, isLoading } = useAddHint();

  const newHintTags = useRef([]);

  const { register, handleSubmit, clearErrors, watch, setFocus } = useForm();

  const watchContent = watch('content', '');

  function onNewHint(data) {
    if (newHintTags.current.length === 0) {
      toast.error(() => (
        <Notification text="Your hint must have at least 1 tag!" />
      ));
      return;
    }

    addHint(
      {
        description: data.content,
        gameId,
        hintTypes: newHintTags.current,
        userId,
      },
      {
        onSuccess: () => {
          toast(() => <Notification text="Added a new Hint!" />);
          onCloseModal?.();
        },
        onError: () =>
          toast.error(() => <Notification text="Unable to add your Hint" />),
      }
    );
  }

  function onError(e) {
    onErrorToast(e);
  }

  function handleCancel(e) {
    e.preventDefault();
    onCloseModal?.();
  }

  function setHintTags(newTag) {
    if (newHintTags.current.includes(newTag)) {
      newHintTags.current = newHintTags.current.filter((tag) => tag !== newTag);
    } else {
      newHintTags.current.push(newTag);
    }

    clearErrors('tags');
  }

  useEffect(() => {
    setFocus('content');
  }, [setFocus]);

  return (
    <StyledNewHint onSubmit={handleSubmit(onNewHint, onError)}>
      <NewHintHeader>
        <NewHintButtonsContainer>
          <Button isLight={true} onClick={handleCancel}>
            Cancel
          </Button>
          <Button disabled={isLoading} isLight={false}>
            Submit
          </Button>
        </NewHintButtonsContainer>
        <StyledButtonContainer>
          {TAGS.map((tag) => (
            <TagButton key={tag} tag={tag} setHintTags={setHintTags} />
          ))}
        </StyledButtonContainer>
      </NewHintHeader>
      <NewHintBody>
        <NewHintTextArea
          {...register('content', {
            required: {
              value: true,
              message: `Your hint must be at least ${HINT_MIN_LENGTH} characters!`,
            },
            minLength: {
              value: HINT_MIN_LENGTH,
              message: `Your hint must be at least ${HINT_MIN_LENGTH} characters!`,
            },
            maxLength: {
              value: HINT_MAX_LENGTH,
              message: `Your hint cannot be more than ${HINT_MAX_LENGTH} characters!`,
            },
          })}
        />
        <TextCount
          value={watchContent}
          minLength={HINT_MIN_LENGTH}
          maxLength={HINT_MAX_LENGTH}
        />
      </NewHintBody>
    </StyledNewHint>
  );
}

NewHint.propTypes = {
  user: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default NewHint;
