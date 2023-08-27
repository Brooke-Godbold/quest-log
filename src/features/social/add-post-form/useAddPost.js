import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost as AddPostApi } from "../../../services/apiPost";

export function useAddPost() {
  const queryClient = useQueryClient();

  const { mutate: addPost, isLoading } = useMutation({
    mutationFn: AddPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post"],
      });
    },
  });

  return { addPost, isLoading };
}
