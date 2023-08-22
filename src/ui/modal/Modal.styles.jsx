import { styled } from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s;
  padding: 3rem;

  background-color: var(--color-brand-700);
  color: #bbb;
  border: 2px solid rgb(187, 187, 187, 0.5);
  border-radius: 4px;
  box-shadow: 0 0 2px 2px rgb(0, 0, 0, 0.3);
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
  position: absolute;
  border: none;
  background: none;
  right: 0.5rem;
  top: 0.5rem;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    transition: all 0.3s;
  }

  & svg:hover {
    color: #888;
  }
`;

export { StyledModal, Overlay, ModalCloseButton };
