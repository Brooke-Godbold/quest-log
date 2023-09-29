import styled from 'styled-components';

const StyledPersonalizationMenu = styled.div`
  position: fixed;
  top: 15%;
  right: 0;

  padding: 2.4rem;

  z-index: 999;

  background-color: var(--color-brand-500);
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;

  display: flex;
  flex-direction: column;
  gap: 3.6rem;

  transition: all 0.3s;

  transform: ${(props) => (props.$isOpen ? 'translate(0)' : 'translate(100%)')};

  @media (max-width: 45em) {
    gap: 1.8rem;

    margin-left: 2.4rem;
  }

  @media (max-height: 75em) {
    top: 5%;
  }

  @media (max-height: 65em) {
    top: 15%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MainMenuHeading = styled.h2`
  grid-column: 1 / -1;
`;

const MenuSectionHeading = styled.h3``;

const PersonalizationMenuSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1.2rem;

  align-items: center;

  width: 100%;

  & input,
  & select {
    grid-column: 1 / -1;
    width: 100%;
  }

  @media (max-width: 50em) {
    gap: 0.6rem;
    font-size: 1.2rem;
  }

  @media (max-width: 20em) {
    gap: 0.5rem;
    font-size: 0.8rem;
  }
`;

const MainColorInput = styled.input`
  background-color: var(--color-brand-200);

  border-radius: 3px;
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border: none;
`;

const PersonalizationButtonContainer = styled.div`
  display: flex;
  gap: 2.4rem;

  justify-content: center;

  grid-column: 1 / -1;
`;

const ResetButton = styled.button`
  justify-self: end;

  border: none;
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border-radius: 3px;

  background-color: var(--color-brand-700);
  color: var(--color-brand-300);

  padding: 0.8rem 1.2rem;

  transition: all 0.3s;

  &:hover {
    background-color: var(--color-brand-600);
  }
`;

export {
  StyledPersonalizationMenu,
  MainColorInput,
  PersonalizationButtonContainer,
  PersonalizationMenuSection,
  MenuSectionHeading,
  ResetButton,
  MainMenuHeading,
};
