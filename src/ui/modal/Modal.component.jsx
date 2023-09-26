import PropTypes from 'prop-types';

import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';

import { HiX } from 'react-icons/hi';

import { ModalCloseButton, Overlay, StyledModal } from './Modal.styles';

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

function Open({ children, opens: opensWindowName, onOpenCallback }) {
  const { open } = useContext(ModalContext);

  function openModal() {
    open(opensWindowName);
    onOpenCallback?.();
  }

  return cloneElement(children, { onClick: () => openModal() });
}

function Window({ children, name, onCloseCallback }) {
  const { openName, close } = useContext(ModalContext);

  if (name !== openName) return null;

  function closeModal() {
    close();
    onCloseCallback?.();
  }

  return createPortal(
    <Overlay>
      <StyledModal>
        <ModalCloseButton onClick={closeModal}>
          <HiX />
        </ModalCloseButton>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Window.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  onCloseCallback: PropTypes.func,
  onOpenCallback: PropTypes.func,
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
