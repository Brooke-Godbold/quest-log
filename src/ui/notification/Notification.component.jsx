import PropTypes from 'prop-types';

import toast from 'react-hot-toast';

import { HiX } from 'react-icons/hi';

import {
  NotificationCloseButton,
  StyledNotification,
} from './Notification.styles';

function Notification({ toastId, text, link }) {
  return (
    <StyledNotification>
      {text && <p>{text}</p>}
      {link}
      <NotificationCloseButton onClick={() => toast.dismiss(toastId)}>
        <HiX />
      </NotificationCloseButton>
    </StyledNotification>
  );
}

Notification.propTypes = {
  toastId: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.node,
};

export default Notification;
