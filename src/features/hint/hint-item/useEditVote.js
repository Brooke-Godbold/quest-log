import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editVote as editVoteApi } from "../../../services/apiVotes";

export function useEditVote(id) {
  const queryClient = useQueryClient();

  const {
    mutate: editVote,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: editVoteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`votes_${id}`],
      });
    },
  });

  return { editVote, isLoading, isError };
}
