import { styled } from "styled-components";

const StyledGame = styled.div`
  display: grid;
  grid-template-rows: 1fr 1.5fr;
  margin: 0 auto;
  gap: 2.4rem;
  height: 100%;
  max-width: 75%;
  padding: 5rem;
  background-color: var(--color-brand-200);

  @media (max-width: 125em) {
    max-width: 100%;
  }

  @media (max-width: 100em) {
    padding: 15rem 5rem 5rem 5rem;
  }

  @media (max-width: 75em) {
    grid-template-rows: auto 1fr;
    gap: 0;
  }

  @media (max-width: 40em) {
    padding: 20rem 1.2rem 1.2rem 1.2rem;
  }
`;

export { StyledGame };
