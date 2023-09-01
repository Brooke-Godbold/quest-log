import { useQuery } from "@tanstack/react-query";
import { getReplyByPostId } from "../../services/apiPost";

export function useReplyByPostId(postId) {
  const {
    isLoading: isGettingReplies,
    data: replies,
    isError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getReplyByPostId(postId),
    retry: false,
  });

  return { isGettingReplies, replies, isError };
}
