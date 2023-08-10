import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateHintPopularity as updateHintPopularityApi } from "../../../services/apiHints";

export function useUpdateHintPopularity() {
  const queryClient = useQueryClient();

  const { mutate: updateHintPopularity, isLoading } = useMutation({
    mutationFn: updateHintPopularityApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["hints"],
      });
    },
  });

  return { updateHintPopularity, isLoading };
}
