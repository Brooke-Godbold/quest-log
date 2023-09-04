import { styled } from "styled-components";

const StyledSignup = styled.div`
  background-color: var(--color-brand-100);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5.4rem 0;

  @media (max-height: 60em) {
    height: 100%;
  }
`;

export { StyledSignup };
