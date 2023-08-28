import { styled } from "styled-components";
import { CommonScrollBar } from "../../../styles/GlobalStyles";

const StyledHintListSection = styled.div`
  background-color: var(--color-brand-700);
  min-height: 0;
  display: grid;
  grid-template-rows: auto 1fr;

  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border-radius: 7px;

  @media (max-width: 75em) {
    display: ${(props) => (!props.$detailsActive ? "grid" : "none")};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 65em) {
    flex-direction: column;
  }
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
  position: relative;
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
  background-color: var(--color-brand-600);
  padding: 2rem 0;

  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
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
