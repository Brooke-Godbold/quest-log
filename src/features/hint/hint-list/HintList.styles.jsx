import { styled } from "styled-components";

const StyledHintListSection = styled.div`
  background-color: #ddd;
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
  overflow: auto;
`;

const HintListOverlay = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
`;

const HintList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 2rem;
  height: 100%;
  min-height: 0;

  overflow: ${(props) => (props.$scrollEnabled ? "auto" : "hidden")};

  &::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999; /* color of the scroll thumb */
    border: 3px solid #999; /* creates padding around scroll thumb */
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #777; /* color of the scroll thumb */
    border: 3px solid #777; /* creates padding around scroll thumb */
  }

  &::before {
    content: "";
    background: #ccc;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    box-shadow: 3px 0 10px 1px rgb(0, 0, 0, 0.2);
  }
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
  background-color: #ccc;
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
