import { styled } from "styled-components";
import { CommonButton } from "../../styles/GlobalStyles";

const StyledButton = styled.button`
  ${CommonButton}
`;

const StyledLinkButton = styled.a`
  display: inline-block;
  ${CommonButton}
`;

export { StyledButton, StyledLinkButton };
