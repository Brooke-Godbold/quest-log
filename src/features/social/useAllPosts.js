import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/apiPost";

export function useAllPosts() {
  const {
    isLoading: isGettingPosts,
    data: posts,
    isError,
  } = useQuery({
    queryKey: ["post"],
    queryFn: getAllPosts,
  });

  return { isGettingPosts, posts, isError };
}
