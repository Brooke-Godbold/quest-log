import { useQuery } from "@tanstack/react-query";
import { getGames } from "../../../services/apiGames";

export function useSearchGames(searchQuery) {
  const {
    isLoading,
    data: gameData,
    isError,
  } = useQuery({
    queryKey: ["games", searchQuery],
    queryFn: () => getGames(searchQuery),
  });

  return { isLoading, gameData, isError };
}
