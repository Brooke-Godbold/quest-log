import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHint as deleteHintApi } from "../../../services/apiHints";

export function useDeleteHint() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteHint,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: deleteHintApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["hints"],
      });
    },
  });

  return { deleteHint, isLoading, isError };
}
