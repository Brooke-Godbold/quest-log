import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import {
  NewHintHeader,
  NewHintHeading,
  NewHintTextArea,
  StyledNewHint,
} from "./NewHint.styles";
import { StyledButtonContainer } from "../../../ui/button-container/ButtonContainer.styles";
import { useAddHint } from "./useAddHint";
import TagButton from "../tag-button/TagButton.component";
import { useRef } from "react";
import Button from "../../../ui/button/Button.component";

function NewHint({ setIsNewHint, user: { id: userId } }) {
  const { id: gameId } = useParams();
  const { addHint } = useAddHint();

  const newHintTags = useRef([]);
  const newHintTextRef = useRef();

  function handleClick() {
    setIsNewHint(false);

    const newHintText = newHintTextRef.current.value;

    if (newHintText.length === 0) return;

    console.log(userId);

    addHint({
      description: newHintText,
      gameId,
      hintTypes: newHintTags.current,
      userId,
    });
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
        <NewHintHeading>New Hint</NewHintHeading>
        <Button isLight={false} onClick={handleClick}>
          Submit
        </Button>
        <StyledButtonContainer>
          <TagButton tag={"Mechanics"} setHintTags={setHintTags} />
          <TagButton tag={"World"} setHintTags={setHintTags} />
          <TagButton tag={"Skills"} setHintTags={setHintTags} />
        </StyledButtonContainer>
      </NewHintHeader>
      <NewHintTextArea ref={newHintTextRef} />
    </StyledNewHint>
  );
}

NewHint.propTypes = {
  setIsNewHint: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default NewHint;
