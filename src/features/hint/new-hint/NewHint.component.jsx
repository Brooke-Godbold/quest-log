import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import {
  NewHintButton,
  NewHintHeader,
  NewHintHeading,
  NewHintTagsContainer,
  NewHintTextArea,
  StyledNewHint,
} from "./NewHint.styles";
import { useAddHint } from "./useAddHint";
import TagButton from "../tag-button/TagButton.component";
import { useRef } from "react";

function NewHint({ setIsNewHint }) {
  const { id: gameId } = useParams();
  const { addHint } = useAddHint();

  const newHintTags = useRef([]);
  const newHintTextRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    setIsNewHint(false);

    const newHintText = newHintTextRef.current.value;

    if (newHintText.length === 0) return;

    addHint({
      description: newHintText,
      gameId,
      hintTypes: newHintTags.current,
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
    <StyledNewHint onSubmit={handleSubmit}>
      <NewHintHeader>
        <NewHintHeading>New Hint</NewHintHeading>
        <NewHintButton>+</NewHintButton>
        <NewHintTagsContainer>
          <TagButton tag={"Mechanics"} setHintTags={setHintTags} />
          <TagButton tag={"World"} setHintTags={setHintTags} />
          <TagButton tag={"Skills"} setHintTags={setHintTags} />
        </NewHintTagsContainer>
      </NewHintHeader>
      <NewHintTextArea ref={newHintTextRef} />
    </StyledNewHint>
  );
}

NewHint.propTypes = {
  setIsNewHint: PropTypes.func.isRequired,
};

export default NewHint;
