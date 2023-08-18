import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVote as deleteVoteApi } from "../../../services/apiVotes";

export function useDeleteVote(id) {
  const queryClient = useQueryClient();

  const {
    mutate: deleteVote,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: deleteVoteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`votes_${id}`],
      });
    },
  });

  return { deleteVote, isLoading, isError };
}
