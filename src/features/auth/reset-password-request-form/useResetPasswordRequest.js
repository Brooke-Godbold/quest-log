import { useMutation } from "@tanstack/react-query";
import { forgottenPassword as forgottenPasswordApi } from "../../../services/apiAuth";

export function useResetPasswordRequest() {
  const {
    mutate: forgottenPassword,
    isLoading,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: forgottenPasswordApi,
  });

  return { forgottenPassword, isLoading, isError, isSuccess };
}
