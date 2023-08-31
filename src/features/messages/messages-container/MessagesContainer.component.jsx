import AvatarNavLink from "../../../ui/avatar-nav-link/AvatarNavLink.component";
import MessageItem from "../message-item/MessageItem.component";
import NewMessage from "../new-message/NewMessage.component";
import {
  ConversationBox,
  ConversationBoxContainer,
  ConversationBoxShadow,
  ConversationHeader,
  StyledMessagesContainer,
} from "./MessagesContainer.styles";
import { useUser } from "../../auth/useUser";
import { useMessages } from "../useMessages";
import { useEffect, useRef, useState } from "react";
import { useUpdateMessage } from "../useUpdateMessage";
import { useConversations } from "../../../contexts/ConversationsContext";

function MessagesContainer() {
  const { user } = useUser();
  const { conversations } = useMessages(user?.id);
  const { updateMessages } = useUpdateMessage(user?.id);

  const [conversation, setConversation] = useState(null);

  const { currentConversation } = useConversations();

  useEffect(
    function () {
      if (!conversations || !currentConversation) return;

      const c = conversations.filter(
        (conversation) =>
          conversation.userIdA === currentConversation ||
          conversation.userIdB === currentConversation
      )[0];
      setConversation(c);
    },
    [conversations, currentConversation]
  );

  useEffect(
    function () {
      if (!conversation) return;
      if (
        conversation.conversation.filter((message) => !message.isViewed)
          .length === 0
      )
        return;

      const viewedConversation = conversation.conversation.map((message) => ({
        ...message,
        isViewed:
          message.userId !== user.id && !message.isViewed
            ? true
            : message.isViewed,
      }));

      updateMessages({ messagesId: conversation.id, data: viewedConversation });
    },
    [conversation, user, updateMessages]
  );

  const BottomScrollElement = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <StyledMessagesContainer>
      <ConversationHeader>
        {currentConversation && <AvatarNavLink userId={currentConversation} />}
      </ConversationHeader>
      <ConversationBoxContainer>
        <ConversationBox>
          {conversation?.conversation.map((c) => (
            <MessageItem
              key={c.createdAt}
              isSender={c.userId !== user.id}
              content={c.content}
              createdAt={c.createdAt}
            />
          ))}
          <BottomScrollElement />
        </ConversationBox>
        <ConversationBoxShadow />
      </ConversationBoxContainer>
      <NewMessage conversation={conversation} />
    </StyledMessagesContainer>
  );
}

export default MessagesContainer;
