import { styled } from "styled-components";
import { CommonScrollBar } from "../../../styles/GlobalStyles";

const StyledHintListSection = styled.div`
  background-color: var(--color-brand-700);
  min-height: 0;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
`;

const HintListContainer = styled.div`
  position: relative;
  height: 0;
  min-height: 100%;

  overflow: ${(props) => (props.$scrollEnabled ? "auto" : "hidden")};

  ${CommonScrollBar}
`;

const HintListOverlay = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
`;

const HintList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 2rem;
  min-height: 0;
`;

const NoHints = styled.p`
  align-self: center;
  font-size: 4.8rem;
  font-weight: 700;
  color: #aaa;
  margin-top: 10rem;
`;

const StyledHintListHeader = styled.div`
  position: relative;
  background-color: var(--color-brand-500);
  padding: 2rem 0;
`;

export {
  HintList,
  StyledHintListSection,
  NoHints,
  HintListOverlay,
  HintListContainer,
  ButtonContainer,
  StyledHintListHeader,
};
