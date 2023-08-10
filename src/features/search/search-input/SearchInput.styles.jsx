import { styled } from "styled-components";

const StyledSearchInput = styled.div`
  margin: 15rem;
`;

const Input = styled.input`
  border: none;
  border-radius: var(--border-radius-sm);
  padding: 1.5rem 3rem;
  font-size: 3rem;

  &::placeholder {
    color: #bbb;
  }
`;

export { StyledSearchInput, Input };
