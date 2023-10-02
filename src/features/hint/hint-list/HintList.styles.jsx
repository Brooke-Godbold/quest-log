import { styled } from 'styled-components';
import {
  CommonButton,
  CommonInput,
  CommonScrollBar,
} from '../../../styles/GlobalStyles';

const StyledHintListSection = styled.div`
  min-height: 0;
  display: grid;
  grid-template-rows: auto auto 1fr;

  max-width: 100%;

  @media (max-width: 100em) {
    display: ${(props) => (!props.$detailsActive ? 'grid' : 'none')};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  justify-content: space-between;

  @media (max-width: 65em) {
    flex-direction: column;
  }
`;

const HintListContainer = styled.div`
  background-color: var(--color-brand-700);

  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;

  position: relative;
  height: 0;
  min-height: 100%;

  overflow: auto;

  ${CommonScrollBar}

  @media (max-width: 100em) {
    height: auto;
  }
`;

const HintList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 2rem;
  min-height: 0;
`;

const NoHints = styled.p`
  align-self: center;
  font-size: 4.8rem;
  font-weight: 700;
  color: #aaa;
  margin: 10rem;
`;

const StyledHintListHeader = styled.div`
  position: relative;
  background-color: var(--color-brand-600);

  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;

  @media (max-width: 100em) {
    padding: 0;
  }
`;

const HintHeaderFilterSection = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;

  & select {
    width: 100%;
  }

  @media (max-width: 65em) {
    width: 100%;
  }
`;

const UserSearch = styled.form`
  display: flex;

  @media (max-width: 65em) {
    & input {
      height: auto;
      width: 100%;
    }
  }
`;

const UserSearchInput = styled.input`
  ${CommonInput}

  height: 100%;
  padding: 1rem 2rem;
  font-size: 1.6rem;

  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  flex: 1;

  &::placeholder {
    color: var(--color-brand-500);
  }
`;

const ResetUserButton = styled.button`
  ${CommonButton}

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: auto;

  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  & svg {
    transform: scale(125%);
  }
`;

export {
  HintList,
  StyledHintListSection,
  NoHints,
  HintListContainer,
  ButtonContainer,
  StyledHintListHeader,
  UserSearch,
  UserSearchInput,
  ResetUserButton,
  HintHeaderFilterSection,
};
