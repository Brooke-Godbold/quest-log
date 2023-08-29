import { styled } from "styled-components";

const StyledButtonContainer = styled.div`
  display: flex;

  & * {
    border-radius: 0 !important;
  }

  & *:first-child {
    border-top-left-radius: 10px !important;
    border-bottom-left-radius: 10px !important;
  }

  & *:last-child {
    border-top-right-radius: 10px !important;
    border-bottom-right-radius: 10px !important;
  }

  @media (max-width: 35em) {
    & button {
      font-size: 1.2rem;
      padding: 1rem;
    }
  }
`;

export { StyledButtonContainer };
