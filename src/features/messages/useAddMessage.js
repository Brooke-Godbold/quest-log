import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMessage as addMessageApi } from "../../services/apiMessages";

export function useAddMessage(userId) {
  const queryClient = useQueryClient();

  const { mutate: addMessage, isLoading: isAddingMessage } = useMutation({
    mutationFn: addMessageApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`messages_${userId}`],
      });
    },
  });

  return { addMessage, isAddingMessage };
}
