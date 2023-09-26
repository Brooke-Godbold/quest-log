import { styled } from 'styled-components';
import { CommonCloseButton } from '../../styles/GlobalStyles';

const StyledNotification = styled.div`
  padding: 0.8rem 0.8rem;
  font-size: 1.8rem;

  display: flex;
  align-items: center;
  gap: 1.8rem;
`;

const NotificationCloseButton = styled.button`
  ${CommonCloseButton}
`;

export { StyledNotification, NotificationCloseButton };
