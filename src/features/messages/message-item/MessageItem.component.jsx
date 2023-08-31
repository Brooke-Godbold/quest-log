import PropTypes from "prop-types";
import { MessageTime, StyledMessageItem } from "./MessageItem.styles";
import { format } from "date-fns";

function MessageItem({ isSender, content, createdAt }) {
  return (
    <StyledMessageItem $isSender={isSender}>
      <p>{content}</p>
      <MessageTime>{format(new Date(createdAt), "Pp")}</MessageTime>
    </StyledMessageItem>
  );
}

MessageItem.propTypes = {
  isSender: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default MessageItem;
