import { useQuery } from "@tanstack/react-query";
import { getGamesByIds } from "../../services/apiGames";

export function useGamesByIds(ids) {
  const {
    isLoading,
    isFetching,
    data: gameData,
    isError,
  } = useQuery({
    queryKey: [`currently_playing_${ids}`],
    queryFn: () => getGamesByIds(ids),
  });

  return { isLoading, isFetching, gameData, isError };
}
