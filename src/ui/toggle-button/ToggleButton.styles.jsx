import { styled } from "styled-components";
import { CommonButton } from "../../styles/GlobalStyles";

const StyledToggleButton = styled.button`
  ${CommonButton}

  background-color: ${(props) =>
    props.$isToggled && props.$isLight
      ? "var(--color-brand-200);"
      : !props.$isToggled && props.$isLight
      ? "var(--color-brand-300);"
      : props.$isToggled && !props.$isLight
      ? "var(--color-brand-800)"
      : "var(--color-brand-700)"};
`;

export { StyledToggleButton };
