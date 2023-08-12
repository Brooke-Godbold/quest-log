import { styled } from "styled-components";

const StyledButtonContainer = styled.div`
  display: flex;

  & *:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  & *:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

export { StyledButtonContainer };
