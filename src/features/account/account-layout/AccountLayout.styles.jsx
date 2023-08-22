import { styled } from "styled-components";

const StyledAccountLayout = styled.div`
  max-width: 50%;
  height: 100%;
  margin: 0 auto;
  padding-top: 10rem;
  background-color: var(--color-brand-400);
`;

const AccountSection = styled.div`
  background-color: var(--color-brand-500);
  padding: 5rem;
  min-height: 0;
`;

const AccountSectionHeading = styled.h1`
  font-size: 6.4rem;
  text-align: center;
  margin-bottom: 10rem;
`;

const AccountGridContainer = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 1rem;
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
`;

const AccountSectionButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export {
  StyledAccountLayout,
  AccountSectionButtonsContainer,
  AccountSectionButtons,
  AccountGridContainer,
  AccountSectionHeading,
  AccountSection,
};
