import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateHint as updateHintApi } from "../../services/apiHints";

export function useUpdateHint(onSuccess) {
  const queryClient = useQueryClient();

  const { mutate: updateHint, isLoading: isUpdatingHint } = useMutation({
    mutationFn: updateHintApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["hints"],
      });
      onSuccess?.();
    },
  });

  return { updateHint, isUpdatingHint };
}
