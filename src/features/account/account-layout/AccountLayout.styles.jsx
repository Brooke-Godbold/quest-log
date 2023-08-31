import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { CommonButton } from "../../../styles/GlobalStyles";

const StyledAccountLayout = styled.div`
  max-width: 50%;
  height: 100%;
  margin: 0 auto;
  background-color: var(--color-brand-400);

  @media (max-width: 140em) {
    max-width: 75%;
  }

  @media (max-width: 120em) {
    max-width: 100%;
  }

  @media (max-width: 65em) {
    display: flex;
    flex-direction: column;
  }
`;

const AccountSection = styled.div`
  background-color: var(--color-brand-500);
  padding: 5rem;
  min-height: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 70em) {
    padding: 1.2rem;
  }

  @media (max-width: 50em) {
    width: 100%;
    height: 100%;
  }
`;

const AccountSectionHeading = styled.h1`
  font-size: 6.4rem;
  text-align: center;
  padding: 7.4rem 0;

  @media (max-width: 45em) {
    padding: 5rem 0;
  }
`;

const AccountGridContainer = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 1rem;

  @media (max-width: 65em) {
    flex: 1;
  }

  @media (max-width: 50em) {
    display: flex;
  }
`;

const AccountSectionButtons = styled.div`
  background-color: var(--color-brand-500);
  padding: 0 2rem;

  & div {
    padding: 2rem 0;
    border-bottom: 2px solid rgba(34, 34, 34, 0.5);
  }

  & div:last-child {
    border-bottom: none;
  }

  @media (max-width: 50em) {
    display: none;
  }
`;

const AccountSectionButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const AccountSectionNavLink = styled(NavLink)`
  ${CommonButton}

  @media (max-width: 70em) {
    font-size: 1.4rem;
  }
`;

export {
  StyledAccountLayout,
  AccountSectionButtonsContainer,
  AccountSectionButtons,
  AccountGridContainer,
  AccountSectionHeading,
  AccountSection,
  AccountSectionNavLink,
};
