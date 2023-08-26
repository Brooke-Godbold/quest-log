import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import {
  NewHintButtonsContainer,
  NewHintHeader,
  NewHintTextArea,
  StyledNewHint,
} from "./NewHint.styles";
import { StyledButtonContainer } from "../../../ui/button-container/ButtonContainer.styles";
import { useAddHint } from "./useAddHint";
import TagButton from "../tag-button/TagButton.component";
import { useRef, useState } from "react";
import Button from "../../../ui/button/Button.component";
import Modal from "../../../ui/modal/Modal.component";
import { FormError } from "../../../ui/form-error/FormError.styles";
import ConfirmationCheck from "../../../ui/confirmation-check/ConfirmationCheck.component";
import { ConfirmationText } from "../../../ui/confirmation-check/ConfirmationCheck.styles";

function NewHint({ setIsNewHint, user: { id: userId } }) {
  const { id: gameId } = useParams();
  const { addHint, isLoading } = useAddHint();

  const newHintTags = useRef([]);
  const [newHintText, setNewHintText] = useState("");

  function handleSubmit() {
    setIsNewHint(false);

    addHint({
      description: newHintText,
      gameId,
      hintTypes: newHintTags.current,
      userId,
    });
  }

  function handleCancel() {
    setIsNewHint(false);
  }

  function setHintTags(newTag) {
    if (newHintTags.current.includes(newTag)) {
      newHintTags.current = newHintTags.current.filter((tag) => tag !== newTag);
    } else {
      newHintTags.current.push(newTag);
    }
  }

  return (
    <StyledNewHint>
      <NewHintHeader>
        <NewHintButtonsContainer>
          <Button isLight={true} onClick={handleCancel}>
            Cancel
          </Button>
          <Modal>
            <Modal.Open opens="confirmSubmit">
              <Button disabled={newHintText.length <= 10} isLight={false}>
                Submit
              </Button>
            </Modal.Open>
            <Modal.Window name="confirmSubmit">
              <ConfirmationCheck
                onConfirm={handleSubmit}
                actionLoading={isLoading}
              >
                <ConfirmationText>
                  Are you sure you wish to submit a new Hint?
                </ConfirmationText>
              </ConfirmationCheck>
            </Modal.Window>
          </Modal>
        </NewHintButtonsContainer>
        <StyledButtonContainer>
          <TagButton tag={"Mechanics"} setHintTags={setHintTags} />
          <TagButton tag={"World"} setHintTags={setHintTags} />
          <TagButton tag={"Skills"} setHintTags={setHintTags} />
        </StyledButtonContainer>
      </NewHintHeader>
      <NewHintTextArea
        value={newHintText}
        onChange={(e) => setNewHintText(e.target.value)}
      />
      {newHintText.length <= 10 && (
        <FormError>Your hint must be at least 10 characters!</FormError>
      )}
    </StyledNewHint>
  );
}

NewHint.propTypes = {
  setIsNewHint: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default NewHint;
