import { styled } from "styled-components";
import { CommonButton } from "../../styles/GlobalStyles";

const StyledToggleButton = styled.button`
  ${CommonButton}

  background-color: ${(props) =>
    props.$isToggled && props.$isLight
      ? "#888"
      : !props.$isToggled && props.$isLight
      ? "#bbb"
      : props.$isToggled && !props.$isLight
      ? "#000"
      : "#333"};
`;

export { StyledToggleButton };
