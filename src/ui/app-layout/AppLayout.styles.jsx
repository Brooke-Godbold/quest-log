import { styled } from "styled-components";

const StyledAppLayout = styled.div`
  position: relative;

  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  flex: 1;
  background-color: var(--color-brand-100);
`;

export { StyledAppLayout, Main };
