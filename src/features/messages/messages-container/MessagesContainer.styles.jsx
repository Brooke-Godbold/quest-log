import { styled } from "styled-components";
import { CommonScrollBar } from "../../../styles/GlobalStyles";

const StyledMessagesContainer = styled.div`
  width: 100%;

  @media (max-width: 55em) {
    flex: 1;
  }
`;

const ConversationHeader = styled.div`
  width: 100%;
  height: 15%;
  background-color: var(--color-brand-400);
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);

  padding: 2.4rem;

  @media (max-width: 40em) {
    height: 20%;
  }
`;

const ConversationBoxContainer = styled.div`
  position: relative;
  width: 100%;
  height: 67.5%;
`;

const ConversationBox = styled.div`
  width: 100%;
  min-height: 100%;
  height: 0;
  padding: 1.2rem;

  background-color: var(--color-brand-700);

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  ${CommonScrollBar}
  overflow: auto;
`;

const ConversationBoxShadow = styled.span`
  display: block;
  box-shadow: inset 0px 0px 5px 7px rgb(31, 31, 31, 0.5);
  position: absolute;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export {
  StyledMessagesContainer,
  ConversationBox,
  ConversationHeader,
  ConversationBoxShadow,
  ConversationBoxContainer,
};
