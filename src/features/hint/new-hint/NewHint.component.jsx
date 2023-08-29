import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import {
  NewHintBody,
  NewHintButtonsContainer,
  NewHintHeader,
  NewHintTextArea,
  StyledNewHint,
} from "./NewHint.styles";
import { StyledButtonContainer } from "../../../ui/button-container/ButtonContainer.styles";
import { useAddHint } from "./useAddHint";
import TagButton from "../tag-button/TagButton.component";
import { useRef } from "react";
import Button from "../../../ui/button/Button.component";
import { FormError } from "../../../ui/form-error/FormError.styles";
import { useForm } from "react-hook-form";
import TextCount from "../../../ui/text-count/TextCount.component";
import { TAGS } from "../../../data/consts";

const MIN_LENGTH = 25;
const MAX_LENGTH = 450;

function NewHint({ onCloseModal, user: { id: userId } }) {
  const { id: gameId } = useParams();
  const { addHint, isLoading } = useAddHint();

  const newHintTags = useRef([]);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm();

  const watchContent = watch("content");

  function onNewHint(data) {
    console.log(newHintTags.current.length);

    if (newHintTags.current.length === 0) {
      setError("tags", { type: "minLength" });
      return;
    }

    addHint(
      {
        description: data.content,
        gameId,
        hintTypes: newHintTags.current,
        userId,
      },
      { onSuccess: onCloseModal?.() }
    );
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

    clearErrors("tags");
  }

  return (
    <StyledNewHint onSubmit={handleSubmit(onNewHint)}>
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
          {...register("content", {
            required: true,
            minLength: MIN_LENGTH,
            maxLength: MAX_LENGTH,
          })}
        />
        <TextCount
          value={watchContent}
          minLength={MIN_LENGTH}
          maxLength={MAX_LENGTH}
        />
        <div>
          {(errors.content?.type === "required" ||
            errors.content?.type === "minLength") && (
            <FormError>{`Your hint must be at least ${MIN_LENGTH} characters!`}</FormError>
          )}
          {errors.content?.type === "maxLength" && (
            <FormError>{`Your hint cannot be more than ${MAX_LENGTH} characters!`}</FormError>
          )}
          {errors.tags?.type === "minLength" && (
            <FormError>{`Your hint must have at least 1 tag!`}</FormError>
          )}
        </div>
      </NewHintBody>
    </StyledNewHint>
  );
}

NewHint.propTypes = {
  setIsNewHint: PropTypes.func.isRequired,
  user: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default NewHint;
