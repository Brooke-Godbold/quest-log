import { NavLink } from 'react-router-dom';
import { css, styled } from 'styled-components';

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
  backdrop-filter: ${(props) => (props.$active ? 'blur(4px)' : 'none')};
  pointer-events: ${(props) => (props.$active ? 'all' : 'none')};

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
  margin-bottom: 2.4rem;

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: repeat(2, 1fr);
  column-gap: 2.4rem;

  position: relative;
  z-index: 1000;

  align-items: center;

  flex-shrink: 0;

  @media (max-width: 35em) {
    display: flex;
    gap: 1.2rem;
  }
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

  @media (max-width: 35em) {
    width: 5rem;

    border: 5px double rgb(51, 51, 51, 0.7);
  }
`;

const HeaderActionButton = styled.button`
  ${ActionButton}
`;

const HeaderActionLink = styled(NavLink)`
  ${ActionButton}
`;

const BackButton = styled.button`
  ${ActionButton}

  position: absolute;
  top: 0;
  bottom: 0;

  z-index: 1000;

  transform: translate(-25%, -25%);

  &:active,
  &:hover {
    transform: translate(-25%, -25%) scale(110%);
  }

  & svg {
    transform: scale(125%);
  }
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

  @media (max-width: 20em) {
    grid-row: 1 / 2;
    grid-column: 1 / -1;
    justify-self: start;
  }
`;

const NavigationMenuImage = styled.img`
  height: 10rem;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 50%;
  border: 6px double rgb(51, 51, 51, 0.7);

  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);

  @media (max-width: 35em) {
    display: block;
    height: 5rem;

    border: 5px double rgb(51, 51, 51, 0.7);
  }
`;

const NavigationGamesContainer = styled.div`
  display: flex;
  gap: 2.4rem;

  width: max-content;

  transition: all 0.3s;
  position: absolute;
  left: 0;
  top: 0;

  pointer-events: none;

  & a:focus {
    outline: none;
  }

  & a:nth-child(1) {
    transition: all 0.3s;
    opacity: ${(props) => (props.$active ? '1' : '0')};
    transform: ${(props) =>
      props.$active ? 'translate(200%, 0)' : 'translate(0, 0)'};

    &:hover {
      transform: ${(props) =>
        props.$active ? 'translate(200%, 0) scale(110%)' : 'translate(0, 0)'};
    }

    &:active {
      transform: ${(props) =>
        props.$active ? 'translate(200%, 0) scale(120%)' : 'translate(0, 0)'};
    }
  }

  & a:nth-child(2) {
    transition: all 0.3s;
    transform: ${(props) =>
      props.$active ? 'translate(200%, 0)' : 'translate(-125%, 0)'};
    opacity: ${(props) => (props.$active ? '1' : '0')};

    &:hover {
      transform: ${(props) =>
        props.$active
          ? 'translate(200%, 0) scale(110%)'
          : 'translate(-125%, 0)'};
    }

    &:active {
      transform: ${(props) =>
        props.$active
          ? 'translate(200%, 0) scale(120%)'
          : 'translate(-125%, 0)'};
    }
  }

  & a:nth-child(3) {
    transition: all 0.3s;
    transform: ${(props) =>
      props.$active ? 'translate(200%, 0)' : 'translate(-250%, 0)'};
    opacity: ${(props) => (props.$active ? '1' : '0')};

    &:hover {
      transform: ${(props) =>
        props.$active
          ? 'translate(200%, 0) scale(110%)'
          : 'translate(-250%, 0)'};
    }

    &:active {
      transform: ${(props) =>
        props.$active
          ? 'translate(200%, 0) scale(120%)'
          : 'translate(-250%, 0)'};
    }
  }

  @media (max-width: 40em) {
    flex-direction: column;

    width: max-content;
    margin-bottom: 2.4rem;

    top: 90%;

    transform: ${(props) =>
      props.$active ? 'translate(240%, 0)' : 'translate(0, 0)'};

    & a:nth-child(-n + 3) {
      transform: translate(0);

      &:hover {
        transform: scale(110%);
      }

      &:active {
        transform: scale(120%);
      }
    }
  }
`;

const NavigationGamesLink = styled(NavLink)`
  border: none;
  background-color: transparent;

  transition: all 0.3s;

  pointer-events: ${(props) => (props.$active ? 'all' : 'none')};
`;

const NavigationCircleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  margin-left: 2.4rem;

  @media (max-width: 100em) {
    flex-direction: row;
    gap: 1.2rem;
  }
`;

const NavigationCircleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  position: relative;

  height: 10rem;
  width: 10rem;

  border: 7px double rgba(34, 34, 34, 0.5);
  border-radius: 50%;
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);

  background-color: var(--color-brand-400);
  z-index: 998;

  transition: all 0.3s;

  & svg {
    transform: scale(300%);
  }

  & a {
    left: 0;
    color: transparent;
  }

  &:hover {
    transform: scale(110%);

    & a {
      left: 125%;
      color: inherit;
    }
  }

  &:active {
    transform: scale(120%);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 35em) {
    height: 5rem;
    width: 5rem;

    border: 5px double rgba(34, 34, 34, 0.5);

    & svg {
      transform: scale(125%);
    }
  }
`;

const NavigationCircleText = styled.a`
  width: max-content;

  position: absolute;

  pointer-events: none;

  transition: all 0.3s;

  font-size: 1.8rem;
  font-weight: 700;
`;

export {
  StyledNavigation,
  NavigationMenuButton,
  NavigationMenuImage,
  NavigationOverlay,
  NavigationContainer,
  NavigationHeader,
  HeaderActionButton,
  HeaderActionLink,
  UnreadMessages,
  NavigationGamesContainer,
  NavigationGamesLink,
  BackButton,
  NavigationCircleContainer,
  NavigationCircleButton,
  NavigationCircleText,
};
