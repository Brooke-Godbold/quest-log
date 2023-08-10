import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import {
  NewHintButton,
  NewHintHeader,
  NewHintHeading,
  NewHintTextArea,
  StyledNewHint,
} from "./NewHint.styles";
import { useAddHint } from "./useAddHint";

function NewHint({ setIsNewHint }) {
  const { id: gameId } = useParams();
  const { addHint } = useAddHint();

  function handleSubmit(e) {
    e.preventDefault();

    setIsNewHint(false);

    const newHintText = e.target[1].value;

    if (newHintText.length === 0) return;

    addHint({
      description: newHintText,
      gameId,
    });
  }

  return (
    <StyledNewHint onSubmit={handleSubmit}>
      <NewHintHeader>
        <NewHintHeading>New Hint</NewHintHeading>
        <NewHintButton>+</NewHintButton>
      </NewHintHeader>
      <NewHintTextArea />
    </StyledNewHint>
  );
}

NewHint.propTypes = {
  setIsNewHint: PropTypes.func.isRequired,
};

export default NewHint;
