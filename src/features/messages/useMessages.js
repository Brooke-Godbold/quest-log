import { useQuery } from "@tanstack/react-query";
import { GetMessagesByUserId } from "../../services/apiMessages";

export function useMessages(userId) {
  const { isLoading: isLoadingConversations, data: conversations } = useQuery({
    queryKey: [`messages_${userId}`],
    queryFn: () => GetMessagesByUserId(userId),
  });

  return { isLoadingConversations, conversations };
}
