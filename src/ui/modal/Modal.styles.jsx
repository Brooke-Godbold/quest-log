import { styled } from 'styled-components';
import { CommonCloseButton } from '../../styles/GlobalStyles';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s;
  padding: 3.2rem;

  background-color: var(--color-brand-600);
  color: #bbb;
  border-radius: 4px;
  box-shadow: 0px 0px 5px 1px rgb(31, 31, 31, 0.7);

  @media (max-width: 30em) {
    padding: 1.8rem;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.3s;
`;

const ModalCloseButton = styled.button`
  ${CommonCloseButton}

  position: absolute;
  right: 0.75rem;
  top: 0.75rem;
`;

export { StyledModal, Overlay, ModalCloseButton };
