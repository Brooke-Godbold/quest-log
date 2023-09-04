import { NavLink } from "react-router-dom";
import { css, styled } from "styled-components";

import { CommonButton } from "../../styles/GlobalStyles";

const StyledNavigation = styled.div`
  position: relative;

  width: 100%;
`;

const NavigationOverlay = styled.div`
  position: fixed;

  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  transition: all 0.3s;
  backdrop-filter: ${(props) => (props.$active ? "blur(4px)" : "none")};
  pointer-events: ${(props) => (props.$active ? "all" : "none")};

  z-index: 999;
`;

const NavigationContainer = styled.div`
  position: absolute;
  top: 5.4rem;

  width: 25rem;

  z-index: 1000;

  @media (max-width: 100em) {
    top: 2.4rem;
  }
`;

const NavigationHeader = styled.div`
  margin-left: 2.4rem;
  margin-bottom: 2.4rem;

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: repeat(2, 1fr);
  column-gap: 2.4rem;

  align-items: center;
`;

const ActionButton = css`
  position: relative;

  border: none;
  width: 4.2rem;
  height: auto;
  aspect-ratio: 1 / 1;
  border-radius: 50%;

  background-color: var(--color-brand-400);
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transition: all 0.3s;

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

const HeaderActionButton = styled.button`
  ${ActionButton}
`;

const HeaderActionLink = styled(NavLink)`
  ${ActionButton}
`;

const UnreadMessages = styled.div`
  position: absolute;
  pointer-events: none;

  text-align: center;

  width: 100%;
  height: 100%;

  font-weight: 700;
  color: red;

  border: 3px double red;
  border-radius: 50%;
`;

const NavigationMenuButton = styled.button`
  grid-row: 1 / -1;

  border: none;
  background-color: transparent;

  transition: all 0.3s;

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

const NavigationMenuImage = styled.img`
  height: 10rem;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 50%;
  border: 6px double rgb(51, 51, 51, 0.7);

  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
`;

const NavigationMenuContainer = styled.div`
  display: flex;
  flex-direction: column;

  background-color: var(--color-brand-600);
  padding: 1.8rem 1.8rem 1.8rem 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  width: 100%;

  transition: all 0.3s;
  position: absolute;
  transform: ${(props) =>
    props.$active ? "translate(0, 0)" : "translate(-100%, 0)"};

  & *:first-child {
    border-top-right-radius: 5px;
  }

  & *:last-child {
    border-bottom-right-radius: 5px;
  }
`;

const NavigationLink = styled(NavLink)`
  ${CommonButton}

  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const NavigationButton = styled.button`
  ${CommonButton}

  text-align: left;

  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

export {
  StyledNavigation,
  NavigationMenuButton,
  NavigationMenuImage,
  NavigationLink,
  NavigationButton,
  NavigationMenuContainer,
  NavigationOverlay,
  NavigationContainer,
  NavigationHeader,
  HeaderActionButton,
  HeaderActionLink,
  UnreadMessages,
};