import PropTypes from "prop-types";
import AvatarNavLink from "../../../ui/avatar-nav-link/AvatarNavLink.component";
import {
  SenderMessageDetails,
  StyledMessagesSender,
} from "./MessagesSender.styles";

import { BsEnvelopeOpen, BsEnvelopePlusFill } from "react-icons/bs";
import { useProfileByUser } from "../../account/account-layout/useProfileByUser";
import Spinner from "../../../ui/spinner/Spinner";
import { useConversations } from "../../../contexts/ConversationsContext";

function MessagesSender({ senderId, messageCount, isUnread }) {
  const { profile } = useProfileByUser(senderId);

  const { currentConversation, setCurrentConversation } = useConversations();

  function onViewConversation() {
    setCurrentConversation(senderId);
  }

  return (
    <StyledMessagesSender
      $active={currentConversation === senderId}
      onClick={onViewConversation}
    >
      {profile ? (
        <>
          <AvatarNavLink userId={senderId} />
          <SenderMessageDetails>
            <p>{messageCount}</p>
            {isUnread ? <BsEnvelopePlusFill /> : <BsEnvelopeOpen />}
          </SenderMessageDetails>
        </>
      ) : (
        <Spinner />
      )}
    </StyledMessagesSender>
  );
}

MessagesSender.propTypes = {
  senderId: PropTypes.string.isRequired,
  messageCount: PropTypes.number.isRequired,
  isUnread: PropTypes.bool.isRequired,
};

export default MessagesSender;
