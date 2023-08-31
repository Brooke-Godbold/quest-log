import { styled } from "styled-components";

const StyledBlocked = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  position: relative;
`;

const BlockedHeading = styled.h2`
  font-size: 12.8rem;
  z-index: 1;
`;

const BlockedText = styled.h3`
  font-size: 7.4rem;
  z-index: 1;
`;

const BlockedImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    transform: scale(4000%);
    color: var(--color-brand-400);
  }
`;

export { StyledBlocked, BlockedHeading, BlockedImage, BlockedText };
