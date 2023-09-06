import MessagesContainer from "../../features/messages/messages-container/MessagesContainer.component";
import MessagesList from "../../features/messages/messages-list/MessagesList.component";

import { usePageTitle } from "../../hooks/usePageTitle";

import { MessagesHeading, StyledMessages } from "./Messages.styles";

function Messages() {
  usePageTitle("Messaging");

  return (
    <StyledMessages>
      <MessagesHeading>Messages</MessagesHeading>
      <MessagesList />
      <MessagesContainer />
    </StyledMessages>
  );
}

export default Messages;
