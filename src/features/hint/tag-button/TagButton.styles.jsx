import { styled } from "styled-components";

const StyledTagButton = styled.button`
  font-size: 2.5rem;
  border: none;
  padding: 0 2rem;
  font-weight: 700;
  transition: all 0.3s;
  color: #ccc;

  background-color: ${(props) => (props.$isToggled ? "#555" : "#777")};

  &:hover {
    background-color: ${(props) => (props.$isToggled ? "#222" : "#444")};
  }

  &:focus,
  &:active {
    outline: none;
  }
`;

export { StyledTagButton };
