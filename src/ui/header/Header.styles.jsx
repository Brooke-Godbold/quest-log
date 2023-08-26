import { styled } from "styled-components";
import { CommonInput } from "../../styles/GlobalStyles";
import { NavLink } from "react-router-dom";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10rem;
  padding: 6rem 4.8rem;
  background-color: var(--color-brand-500);
  box-shadow: 0 0 2px 2px #000;

  @media (max-width: 50em) {
    display: none;
  }
`;

const HeaderLogoImage = styled.img`
  max-height: 10rem;
`;

const HeaderLinks = styled.div`
  display: flex;
  gap: 4.8rem;
  font-size: 2.4rem;
  align-items: center;
`;

const HeaderButton = styled.button`
  border: none;
  background-color: transparent;
`;

const HeaderLink = styled(NavLink)`
  &.active {
    color: #943b35;
  }
`;

const HeaderSearchForm = styled.form``;

const HeaderSearch = styled.input`
  ${CommonInput}

  padding: 1rem 2rem;
  font-size: 1.6rem;
`;

export {
  StyledHeader,
  HeaderLinks,
  HeaderButton,
  HeaderLink,
  HeaderSearch,
  HeaderLogoImage,
  HeaderSearchForm,
};
