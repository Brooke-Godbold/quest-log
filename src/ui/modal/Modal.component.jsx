import PropTypes from 'prop-types';

import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { HiX } from 'react-icons/hi';

import { ModalCloseButton, Overlay, StyledModal } from './Modal.styles';
import { useActiveModal } from '../../contexts/ActiveModalContext';

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');
  const activeModalContext = useActiveModal();

  const close = () => {
    setOpenName('');
    activeModalContext.setIsModalOpen(false);
  };
  const open = (opens) => {
    setOpenName(opens);
    activeModalContext.setIsModalOpen(true);
  };

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

function AutoOpen({ opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  useEffect(() => {
    open(opensWindowName);
  }, [open, opensWindowName]);
}

function Open({ children, opens: opensWindowName, onOpenCallback }) {
  const { open } = useContext(ModalContext);

  function openModal(e) {
    e.preventDefault();

    open(opensWindowName);
    onOpenCallback?.();
  }

  return cloneElement(children, { onClick: (e) => openModal(e) });
}

function Window({ children, name, onCloseCallback, closeButton = true }) {
  const { openName, close } = useContext(ModalContext);

  if (name !== openName) return null;

  function closeModal() {
    close();
    onCloseCallback?.();
  }

  return createPortal(
    <Overlay>
      <StyledModal>
        {closeButton && (
          <ModalCloseButton onClick={closeModal}>
            <HiX />
          </ModalCloseButton>
        )}
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
  closeButton: PropTypes.bool,
};

Modal.Open = Open;
Modal.AutoOpen = AutoOpen;
Modal.Window = Window;

export default Modal;
