import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const StyledMobileNavigation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: none;
  backdrop-filter: ${(props) => (props.$active ? "blur(4px)" : "none")};
  color: var(--color-brand-800);
  font-weight: 700;
  pointer-events: none;
  z-index: 1000;

  @media (max-width: 50em) {
    display: block;
  }
`;

const MobileNavigationMenuButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background-color: var(--color-brand-300);
  box-shadow: 0px 0px 3px 3px rgb(31, 31, 31, 0.2);
  border: none;
  height: 5rem;
  width: 5rem;
  border-radius: 5px;
  pointer-events: all;

  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    transform: scale(150%);
    color: var(--color-brand-700);
  }
`;

const MobileNavLinkContainer = styled.div`
  padding: 3rem;
  pointer-events: all;

  & div {
    padding: 3.4rem 1rem 2rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    border-bottom: 2px solid rgba(51, 51, 51, 0.5);
  }

  & div:last-child {
    border-bottom: none;
  }
`;

const MobileNavLink = styled(NavLink)`
  font-size: 2.4rem;

  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MobileMenuButton = styled.button`
  border: none;
  background-color: transparent;
  text-align: left;
  font-size: 2.4rem;
`;

const UnreadMessages = styled.span`
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
  StyledMobileNavigation,
  MobileNavigationMenuButton,
  MobileNavLinkContainer,
  MobileNavLink,
  MobileMenuButton,
  UnreadMessages,
};
