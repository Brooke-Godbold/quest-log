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
  border: solid 2px var(--color-brand-500);
  height: 5rem;
  width: 5rem;
  border-radius: 5px;
  pointer-events: all;

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
`;

const MobileMenuButton = styled.button`
  border: none;
  background-color: transparent;
  text-align: left;
  font-size: 2.4rem;
`;

export {
  StyledMobileNavigation,
  MobileNavigationMenuButton,
  MobileNavLinkContainer,
  MobileNavLink,
  MobileMenuButton,
};
