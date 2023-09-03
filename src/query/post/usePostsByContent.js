import { useQuery } from "@tanstack/react-query";
import { getPostsByContent } from "../../services/apiPost";

export function usePostsByContent(content) {
  const {
    isLoading: isGettingPosts,
    data: posts,
    isError,
  } = useQuery({
    queryKey: ["post", content],
    queryFn: () => getPostsByContent(content),
    retry: false,
  });

  return { isGettingPosts, posts, isError };
}
