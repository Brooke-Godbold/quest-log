import { styled } from 'styled-components';

const GameSelect = styled.select`
  background-color: ${(props) =>
    props.$isPersonalizable && props.$tertiaryColor
      ? props.$tertiaryColor
      : 'var(--color-brand-700)'};

  color: ${(props) =>
    props.$isPersonalizable && props.$secondaryColor
      ? props.$secondaryColor
      : 'var(--color-brand-200)'};

  padding: 1rem 2rem;
  width: 25%;
  font-size: 2rem;

  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border: none;

  border-radius: 9px;

  transition: all 0.3s;

  & option {
    text-align: center;
  }

  &:hover {
    background-color: ${(props) =>
      props.$isPersonalizable && props.$tertiaryColor
        ? props.$tertiaryColor
        : 'var(--color-brand-800)'};

    filter: ${(props) =>
      props.$isPersonalizable && props.$tertiaryColor && 'brightness(75%)'};
  }

  @media (max-width: 120em) {
    font-size: 1.6rem;
  }

  @media (max-width: 25em) {
    font-size: 1.2rem;
  }
`;

export { GameSelect };
