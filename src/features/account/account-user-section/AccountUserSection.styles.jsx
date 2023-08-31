import { styled } from "styled-components";
import { CommonScrollBar } from "../../../styles/GlobalStyles";

const StyledAccountUserSection = styled.div`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.$columns}, 1fr)`};
  grid-template-rows: max-content auto;
  gap: 2.4rem;

  align-items: center;
  justify-content: center;

  width: 75%;
  height: 100%;

  @media (max-width: 65em) {
    width: 100%;
  }
`;

const AccountUsersHeading = styled.h2`
  font-size: 4.8rem;
  text-align: center;

  @media (max-width: 35em) {
    font-size: 3.2rem;
    margin-top: 2.4rem;
  }
`;

const AccountUserList = styled.div`
  width: 100%;
  min-height: 100%;
  height: 0;

  padding: 2.4rem;

  border-radius: 7px;
  background-color: var(--color-brand-700);

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  ${CommonScrollBar}
  overflow: auto;
`;

const AccountUserItem = styled.div`
  height: 10rem;
  width: 100%;
  padding: 1.2rem;

  flex-shrink: 0;

  background-color: var(--color-brand-500);
  border-radius: 5px;
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);

  transition: all 0.3s;

  &:hover {
    background-color: var(--color-brand-400);
  }
`;

export {
  StyledAccountUserSection,
  AccountUserList,
  AccountUserItem,
  AccountUsersHeading,
};
