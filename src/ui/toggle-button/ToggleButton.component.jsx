import PropTypes from "prop-types";

import { StyledToggleButton } from "./ToggleButton.styles";

function ToggleButton({
  isLight = false,
  toggleValue,
  currentToggleValue,
  toggleFunction,
  children,
}) {
  return (
    <StyledToggleButton
      $isLight={isLight}
      $isToggled={toggleValue === currentToggleValue}
      onClick={() => toggleFunction(toggleValue)}
    >
      {children}
    </StyledToggleButton>
  );
}

ToggleButton.propTypes = {
  isLight: PropTypes.bool,
  toggleValue: PropTypes.string.isRequired,
  currentToggleValue: PropTypes.string,
  toggleFunction: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ToggleButton;
