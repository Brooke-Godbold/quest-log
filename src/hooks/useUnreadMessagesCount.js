import { useEffect, useState } from "react";

export function useUnreadMessagesCount(user, conversations) {
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  useEffect(() => {
    function handleUnreadMessagesCount(conversations) {
      if (!conversations || !user) return;

      const count = conversations.reduce((acc, cur) => {
        return (
          acc +
          cur.conversation.filter((c) => c.userId !== user.id && !c.isViewed)
            .length
        );
      }, 0);

      setUnreadMessagesCount(count);
    }

    handleUnreadMessagesCount(conversations);
  });

  return unreadMessagesCount;
}
