import { useQuery } from "@tanstack/react-query";
import { getAllGames } from "../../../services/apiGames";

export function useAllGames() {
  const {
    isLoading,
    data: gameData,
    isError,
  } = useQuery({
    queryKey: ["allGames"],
    queryFn: getAllGames,
  });

  return { isLoading, gameData, isError };
}
