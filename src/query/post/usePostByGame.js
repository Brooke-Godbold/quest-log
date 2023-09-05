import { useQuery } from "@tanstack/react-query";
import { getPostsByGameIds } from "../../services/apiPost";

export function usePostsByGames(gameIds) {
  const {
    isLoading: isGettingPosts,
    data: posts,
    isError,
  } = useQuery({
    queryKey: ["post", gameIds],
    queryFn: () => getPostsByGameIds(gameIds),
    retry: false,
  });

  return { isGettingPosts, posts, isError };
}
