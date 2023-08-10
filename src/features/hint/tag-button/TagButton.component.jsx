import PropTypes from "prop-types";

import { StyledTagButton } from "./TagButton.styles";
import { useState } from "react";

function TagButton({ tag, setHintTags }) {
  const [toggled, setToggled] = useState(false);

  function handleToggle() {
    setToggled((toggled) => !toggled);

    setHintTags(tag);
  }

  return (
    <StyledTagButton type="button" onClick={handleToggle} $isToggled={toggled}>
      {tag}
    </StyledTagButton>
  );
}

TagButton.propTypes = {
  tag: PropTypes.string.isRequired,
  setHintTags: PropTypes.func.isRequired,
};

export default TagButton;
