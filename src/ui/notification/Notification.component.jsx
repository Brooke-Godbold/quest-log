import PropTypes from 'prop-types';

import { HiX } from 'react-icons/hi';

import { StyledNotification } from './Notification.styles';
import { ModalCloseButton } from '../modal/Modal.styles';
import toast from 'react-hot-toast';

function Notification({ toastId, text, link }) {
  return (
    <StyledNotification>
      {text && <p>{text}</p>}
      {link}
      <ModalCloseButton onClick={() => toast.dismiss(toastId)}>
        <HiX />
      </ModalCloseButton>
    </StyledNotification>
  );
}

Notification.propTypes = {
  toastId: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.node,
};

export default Notification;
