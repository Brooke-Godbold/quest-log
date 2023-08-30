import PropTypes from "prop-types";
import { StyledNotification } from "./Notification.styles";

function Notification({ text }) {
  return <StyledNotification>{text}</StyledNotification>;
}

Notification.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Notification;
