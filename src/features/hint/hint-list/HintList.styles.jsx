import { styled } from "styled-components";

const StyledHintListSection = styled.div`
  position: relative;
  background-color: #ddd;
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
`;

const NoHints = styled.p`
  align-self: center;
  font-size: 4.8rem;
  font-weight: 700;
  color: #aaa;
  margin-top: 10rem;
`;

export { HintList, StyledHintListSection, NoHints, HintListOverlay };
