import { styled } from "styled-components";

const StyledSocialPost = styled.div`
  margin: 0 auto;
  gap: 2rem;
  height: 100%;
  max-width: 50%;
  padding: 5rem;
  background-color: var(--color-brand-200);

  display: flex;
  flex-direction: column;

  @media (max-width: 150em) {
    max-width: 75%;
  }

  @media (max-width: 100em) {
    max-width: 100%;
  }

  @media (max-width: 40em) {
    padding: 15rem 1.2rem;
  }
`;

export { StyledSocialPost };
