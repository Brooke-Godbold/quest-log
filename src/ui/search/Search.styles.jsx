import { styled } from "styled-components";
import { CommonInput } from "../../styles/GlobalStyles";

const StyledSearch = styled.div`
  position: absolute;
  top: 5.4rem;
  right: 2.4rem;

  width: 15%;
  height: 7.4rem;

  display: flex;
  align-items: center;

  @media (max-width: 120em) {
    width: 25%;
  }

  @media (max-width: 100em) {
    top: 3.6rem;
  }

  @media (max-width: 65em) {
    width: 45%;
  }

  @media (max-width: 40em) {
    width: 55%;
  }
`;

const SearchForm = styled.form`
  position: absolute;
  right: 10%;

  width: 100%;
  height: 100%;
`;

const SearchInput = styled.input`
  ${CommonInput}

  position: absolute;
  right: 5%;

  width: 100%;
  height: 100%;

  padding: 1.2rem 2.4rem;

  transition: all 0.3s;

  z-index: 997;
  transform-origin: center right;
  transform: ${(props) => (props.$active ? "scaleX(100%)" : "scaleX(0)")};

  @media (max-width: 120em) {
    right: 5%;
  }

  @media (max-width: 30em) {
    position: fixed;
    top: 12.5%;
    right: 10%;
    left: 10%;

    width: 80vw;
    height: 5vh;

    transform-origin: center center;
    transform: ${(props) => (props.$active ? "scale(100%)" : "scale(0)")};
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 10rem;
  width: 10rem;

  border: 7px double rgba(34, 34, 34, 0.5);
  background-color: transparent;
  border-radius: 50%;
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);

  background-color: var(--color-brand-400);
  z-index: 998;

  transition: all 0.3s;

  & svg {
    transform: scale(300%);
  }

  &:hover {
    transform: scale(110%);
  }

  &:active {
    transform: scale(120%);
  }

  &:focus {
    outline: none;
  }
`;

export { StyledSearch, SearchInput, SearchButton, SearchForm };
