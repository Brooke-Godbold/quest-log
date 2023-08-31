import { styled } from "styled-components";
import { CommonScrollBar } from "../../../styles/GlobalStyles";

const StyledMessagesList = styled.div`
  min-height: 100%;
  height: 0;
  padding: 1.2rem;

  background-color: var(--color-brand-700);
  border-radius: 7px;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  ${CommonScrollBar}
  overflow: auto;

  @media (max-width: 55em) {
    flex-direction: row;
    min-height: auto;
    height: fit-content;
  }
`;

export { StyledMessagesList };
