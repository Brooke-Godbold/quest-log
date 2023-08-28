import { styled } from "styled-components";

const StyledNotFound = styled.div`
  position: relative;

  margin: 0 auto;
  gap: 2rem;
  height: 100vh;
  max-width: 100%;
  padding: 5rem;
  background-color: var(--color-brand-200);

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

const NotFoundHeader = styled.h1`
  z-index: 1000;
  font-size: 35rem;
  font-weight: 700;
  color: var(--color-brand-600);
`;

const NotFoundText = styled.p`
  z-index: 1000;
  font-size: 12.8rem;
  color: var(--color-brand-500);
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  & svg {
    position: absolute;
    transform: scale(7000%);
    left: 50%;
    top: 50%;
    fill: var(--color-brand-300);
  }
`;

export { StyledNotFound, NotFoundHeader, NotFoundText, ImageContainer };
