import styled from 'styled-components';
import { CommonButton } from '../../styles/GlobalStyles';
import { NavLink } from 'react-router-dom';

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
    props.$active ? 'translate(0, 0)' : 'translate(-100%, 0)'};

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

const NavigationGameMenuLink = styled(NavLink)`
  ${CommonButton}

  background-color: var(--color-blue-300);

  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  &:hover {
    background-color: var(--color-blue-600);
  }
`;

export {
  NavigationMenuContainer,
  NavigationLink,
  NavigationButton,
  NavigationGameMenuLink,
};
