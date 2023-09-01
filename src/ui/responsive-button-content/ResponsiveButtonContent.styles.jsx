import { styled } from "styled-components";

const ResponsiveButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & p {
    cursor: pointer;
  }

  & svg {
    transform: scale(150%);
    display: none;
    color: var(--color-brand-500);

    cursor: pointer;
  }

  @media (max-width: 35em) {
    & p {
      display: none;
    }

    & svg {
      display: block;
    }
  }
`;

export { ResponsiveButtonContent };
