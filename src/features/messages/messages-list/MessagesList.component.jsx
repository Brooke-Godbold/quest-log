import { useEffect, useState } from 'react';
import { compareDesc } from 'date-fns';

import { useConversations } from '../../../contexts/ConversationsContext';

import { useUser } from '../../../query/auth/useUser';
import { useMessages } from '../../../query/message/useMessages';

import MessagesSender from '../messages-sender/MessagesSender.component';

import { StyledMessagesList } from './MessagesList.styles';

function MessagesList() {
  const { user } = useUser();
  const { conversations } = useMessages(user?.id);

  const [sortedConversations, setSortedConversations] = useState(null);

  const { setInitialConversation } = useConversations();

  useEffect(
    function () {
      if (!conversations || conversations.length === 0 || !user) return;

      const c = [...conversations].sort((c1, c2) =>
        compareDesc(
          new Date(c1.conversation[c1.conversation.length - 1].createdAt),
          new Date(c2.conversation[c2.conversation.length - 1].createdAt)
        )
      );

      setSortedConversations(c);

      setInitialConversation(
        c[0].userIdA === user.id ? c[0].userIdB : c[0].userIdA
      );
    },
    [conversations, setInitialConversation, user]
  );

  return (
    <StyledMessagesList>
      {sortedConversations?.map((conversation) => (
        <MessagesSender
          key={
            conversation.userIdA === user.id
              ? conversation.userIdB
              : conversation.userIdA
          }
          senderId={
            conversation.userIdA === user.id
              ? conversation.userIdB
              : conversation.userIdA
          }
          messageCount={conversation.conversation.length}
          isUnread={
            conversation.conversation.filter(
              (c) => c.userId !== user.id && !c.isViewed
            ).length > 0
          }
        />
      ))}
    </StyledMessagesList>
  );
}

export default MessagesList;
