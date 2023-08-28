import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../../services/apiPost";

export function usePostById(id) {
  const {
    isLoading: isGettingPost,
    data: post,
    isError,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    retry: false,
  });

  return { isGettingPost, post, isError };
}
