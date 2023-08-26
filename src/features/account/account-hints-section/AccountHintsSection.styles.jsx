import { styled } from "styled-components";
import { CommonScrollBar } from "../../../styles/GlobalStyles";

const StyledAccountHints = styled.div`
  height: 0;
  min-height: 100%;
  overflow: auto;

  ${CommonScrollBar}

  @media (max-width: 50em) {
    height: 100%;
  }
`;

const AccountHintsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 0;
  padding: 2px;
`;

export { StyledAccountHints, AccountHintsList };
