import { styled } from "styled-components";
import { CommonInput } from "../../../styles/GlobalStyles";

const StyledSearchInput = styled.div`
  margin: 15rem;

  @media (max-width: 45em) {
    display: flex;
    justify-content: center;
    width: 100%;

    margin-top: 7.4rem;
  }
`;

const Input = styled.input`
  ${CommonInput}

  padding: 1.5rem 3rem;
  font-size: 3rem;

  @media (max-width: 45em) {
    max-width: 80%;
  }
`;

export { StyledSearchInput, Input };
