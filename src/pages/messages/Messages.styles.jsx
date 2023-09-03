import { styled } from "styled-components";
import { CommonPage } from "../../styles/GlobalStyles";

const StyledMessages = styled.div`
  ${CommonPage}

  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: max-content auto;
  column-gap: 2.4rem;

  @media (max-width: 55em) {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }
`;

const MessagesHeading = styled.h1`
  font-size: 5.4rem;
  margin-bottom: 6.4rem;
  text-align: center;

  grid-column: 1 / -1;

  @media (max-width: 55em) {
    margin-bottom: 2.4rem;
  }

  @media (max-width: 100em) {
    margin-bottom: 0;
    margin-top: 3.2rem;
  }
`;

export { StyledMessages, MessagesHeading };
