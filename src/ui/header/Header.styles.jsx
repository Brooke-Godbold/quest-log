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

  @media (max-width: 80em) {
    font-size: 1.6rem;
    gap: 2.4rem;
  }
`;

const HeaderButton = styled.button`
  border: none;
  background-color: transparent;

  transition: all 0.3s;
  color: var(--color-brand-700);

  &:hover {
    transform: scale(110%);
    color: var(--color-brand-200);
  }
`;

const HeaderLink = styled(NavLink)`
  position: relative;

  transition: all 0.3s;
  color: var(--color-brand-700);

  &:hover {
    transform: scale(110%);
    color: var(--color-brand-200);
  }

  &.active {
    color: #943b35;
  }

  &.active:hover {
    color: var(--color-red-100);
  }
`;

const HeaderSearchForm = styled.form`
  @media (max-width: 60em) {
    display: none;
  }
`;

const HeaderSearch = styled.input`
  ${CommonInput}

  padding: 1rem 2rem;
  font-size: 1.6rem;
`;

const UnreadMessages = styled.p`
  position: absolute;
  right: -2.5rem;
  top: -1.5rem;

  width: 3rem;
  height: 3rem;

  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-red-600);

  border: solid 2px var(--color-red-600);
  border-radius: 50%;
`;

export {
  StyledHeader,
  HeaderLinks,
  HeaderButton,
  HeaderLink,
  HeaderSearch,
  HeaderLogoImage,
  HeaderSearchForm,
  UnreadMessages,
};
