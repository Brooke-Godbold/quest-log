import styled from 'styled-components';

const StyledNewUserFlow = styled.div`
  padding: 1.2rem;

  width: 25vw;
  max-height: 85vh;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 120em) {
    width: 50vw;
  }

  @media (max-height: 70em) {
    width: 50vw;
    overflow-y: scroll;
    align-items: start;
  }

  @media (max-width: 65em) {
    width: 75vw;
  }
`;

const StyledNewUserFlowForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 4.8rem;

  justify-content: space-between;

  @media (max-width: 30em) {
    gap: 2.4rem;
  }
`;

const NewUserFlowFollowSuggestion = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 1.2rem;

  position: relative;

  background-color: var(--color-brand-500);
  color: var(--color-brand-700);

  border-radius: 5px;
  padding: 1.2rem;

  transition: all 0.3s;

  &:hover {
    background-color: var(--color-brand-400);
  }
`;

const NewUserSuggestionBio = styled.p`
  grid-column: 1 / -1;
`;

const NewUserSuggestionAddButton = styled.button`
  background-color: var(--color-brand-700);

  border-radius: 3px;
  border: none;
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  padding: 0.6rem 1.2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  width: fit-content;

  position: absolute;
  right: 1.2rem;
  top: 1.2rem;

  transition: all 0.3s;

  & svg {
    color: var(--color-brand-400);
  }

  &:hover {
    background-color: var(--color-brand-600);
    transform: scale(105%);
  }
`;

const NewUserFlowSubSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const NewUserFlowButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.4rem;
`;

export {
  StyledNewUserFlow,
  StyledNewUserFlowForm,
  NewUserFlowFollowSuggestion,
  NewUserFlowButtonContainer,
  NewUserFlowSubSection,
  NewUserSuggestionBio,
  NewUserSuggestionAddButton,
};
