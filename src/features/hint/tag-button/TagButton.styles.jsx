import { styled } from "styled-components";

const StyledTagButton = styled.button`
  font-size: 2.5rem;
  border: none;
  padding: 0 2rem;
  font-weight: 700;
  transition: all 0.3s;
  color: #ccc;

  background-color: ${(props) =>
    props.$isToggled ? "var(--color-brand-700);" : "var(--color-brand-600);"};

  &:hover {
    background-color: ${(props) =>
      props.$isToggled ? "var(--color-brand-800);" : "var(--color-brand-700);"};
  }

  &:focus,
  &:active {
    outline: none;
  }
`;

export { StyledTagButton };
