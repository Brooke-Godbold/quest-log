import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addVote as addVoteApi } from "../../../services/apiVotes";

export function useAddVote(id) {
  const queryClient = useQueryClient();

  const { mutate: addVote, isLoading } = useMutation({
    mutationFn: addVoteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`votes_${id}`],
      });
    },
  });

  return { addVote, isLoading };
}
