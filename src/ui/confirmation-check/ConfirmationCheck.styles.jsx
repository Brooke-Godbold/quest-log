import { styled } from "styled-components";

const StyledConfirmationCheck = styled.div`
  padding: 3.2rem;
`;

const ConfirmationText = styled.p`
  text-align: center;
  font-size: 2.4rem;
`;

const ConfirmationButtonsContainer = styled.div`
  display: flex;
  gap: 6rem;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
`;

const ConfirmationCheckErrorContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export {
  StyledConfirmationCheck,
  ConfirmationButtonsContainer,
  ConfirmationText,
  ConfirmationCheckErrorContainer,
};
