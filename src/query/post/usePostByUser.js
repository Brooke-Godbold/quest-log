import { useQuery } from "@tanstack/react-query";
import { getPostsByUserId } from "../../services/apiPost";

export function usePostByUser(userId) {
  const {
    isLoading: isGettingPosts,
    data: posts,
    isError,
  } = useQuery({
    queryKey: ["post", userId],
    queryFn: () => getPostsByUserId(userId),
    retry: false,
  });

  return { isGettingPosts, posts, isError };
}
