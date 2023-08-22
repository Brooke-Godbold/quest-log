import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePassword as updatePasswordApi } from "../../../services/apiAuth";

export function useUpdatePassword() {
  const queryClient = useQueryClient();

  const {
    mutate: updatePassword,
    isLoading,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  return { updatePassword, isLoading, isError, isSuccess };
}
