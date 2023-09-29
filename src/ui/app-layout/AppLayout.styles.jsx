import { styled } from 'styled-components';

const StyledAppLayout = styled.div`
  position: relative;

  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-height: 65em) {
    overflow-y: ${(props) => (props.$modalOpen ? 'hidden' : 'scroll')};
  }
`;

const Main = styled.div`
  flex: 1;

  background-color: ${(props) =>
    props.$isPersonalizable && props.$secondaryColor
      ? props.$secondaryColor
      : 'var(--color-brand-100)'};
`;

export { StyledAppLayout, Main };
