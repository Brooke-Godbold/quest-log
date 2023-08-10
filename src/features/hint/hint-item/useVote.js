import { useQuery } from "@tanstack/react-query";
import { getVotes } from "../../../services/apiVotes";

export function useVote(id) {
  const {
    isLoading,
    data: voteData,
    isError,
  } = useQuery({
    queryKey: [`votes_${id}`],
    queryFn: () => getVotes(id),
  });

  return { isLoading, voteData, isError };
}
