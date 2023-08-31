import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateMessagesById } from "../../services/apiMessages";

export function useUpdateMessage(userId) {
  const queryClient = useQueryClient();

  const { mutate: updateMessages, isLoading: isUpdatingMessage } = useMutation({
    mutationFn: UpdateMessagesById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`messages_${userId}`],
      });
    },
  });

  return { updateMessages, isUpdatingMessage };
}
