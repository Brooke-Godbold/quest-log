import { styled } from "styled-components";
import { CommonInput } from "../../styles/GlobalStyles";

const FormInput = styled.input`
  ${CommonInput}

  padding: 1rem 2rem;
  width: 100%;

  border: ${(props) =>
    props.$error ? "3px solid var(--color-red-600)" : "none"};

  @media (max-width: 35em) {
    width: 80%;
  }
`;

export { FormInput };
