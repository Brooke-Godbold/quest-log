import { useQuery } from "@tanstack/react-query";
import { getGame } from "../../services/apiGames";

export function useGame(id) {
  const {
    isLoading,
    isFetching,
    data: gameData,
    isError,
  } = useQuery({
    queryKey: ["games"],
    queryFn: () => getGame(id),
  });

  return { isLoading, isFetching, gameData, isError };
}
