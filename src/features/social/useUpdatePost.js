import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost as updatePostApi } from "../../services/apiPost";

export function useUpdatePost() {
  const queryClient = useQueryClient();

  const {
    mutate: updatePost,
    isLoading: isUpdatingPost,
    isError: isUpdatePostError,
  } = useMutation({
    mutationFn: updatePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
    },
  });

  return { updatePost, isUpdatingPost, isUpdatePostError };
}
