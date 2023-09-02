import { styled } from "styled-components";

const GameSelect = styled.select`
  padding: 1rem 2rem;
  background-color: var(--color-brand-700);
  color: var(--color-brand-200);
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
    background-color: var(--color-brand-800);
  }

  @media (max-width: 120em) {
    font-size: 1.6rem;
  }
`;

export { GameSelect };
