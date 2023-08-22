import { useQuery } from "@tanstack/react-query";
import { getVotesByUser } from "../../../services/apiVotes";

export function useVotesByUser(userId) {
  const {
    isLoading,
    data: voteData,
    isError,
  } = useQuery({
    queryKey: [`votes_userId_${userId}`],
    queryFn: () => getVotesByUser(userId),
  });

  return { isLoading, voteData, isError };
}
