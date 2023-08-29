import { styled } from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s;
  padding: 3rem;

  background-color: var(--color-brand-600);
  color: #bbb;
  border-radius: 4px;
  box-shadow: 0px 0px 5px 1px rgb(31, 31, 31, 0.7);
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
  border-radius: 5px;
  background: none;
  right: 0.75rem;
  top: 0.75rem;

  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-brand-500);
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.15);

  transition: all 0.3s;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-brand-600);

    transition: all 0.3s;
  }

  &:hover {
    background-color: var(--color-brand-400);

    & svg {
      color: var(--color-brand-500);
    }
  }
`;

export { StyledModal, Overlay, ModalCloseButton };
