import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateHint as updateHintApi } from "../../services/apiHints";

export function useUpdateHint() {
  const queryClient = useQueryClient();

  const { mutate: updateHint, isLoading: isUpdatingHint } = useMutation({
    mutationFn: updateHintApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["hints"],
      });
    },
  });

  return { updateHint, isUpdatingHint };
}
