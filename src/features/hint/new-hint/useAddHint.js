import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addHint as addHintApi } from "../../../services/apiHints";

export function useAddHint() {
  const queryClient = useQueryClient();

  const { mutate: addHint, isLoading } = useMutation({
    mutationFn: addHintApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["hints"],
      });
    },
  });

  return { addHint, isLoading };
}
