import { styled } from 'styled-components';

const StyledSwitchViewContainer = styled.div`
  display: none;

  @media (max-width: 100em) {
    display: flex;
    gap: 2.4rem;
    justify-content: space-around;
  }

  @media (max-width: 40em) {
    & button {
      width: 40% !important;
    }
  }
`;

export { StyledSwitchViewContainer };
