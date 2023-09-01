import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updatePassword as updatePasswordApi } from "../../services/apiAuth";

import Notification from "../../ui/notification/Notification.component";

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
      toast((t) => (
        <Notification toast={t} text="Successfully updated Password!" />
      ));
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: () => {
      toast.error((t) => (
        <Notification toast={t} text="Unable to update Password at this time" />
      ));
    },
  });

  return { updatePassword, isLoading, isError, isSuccess };
}

/*
toast((t) => (
        <Notification toast={t} text="Successfully updated Password!" />
      ));
      toast.error((t) => (
        <Notification toast={t} text="Unable to update Password at this time" />
      ));


      onSuccess: () => setSignupSuccess(true),
      onError: () =>
        toast.error((t) => (
          <Notification
            toast={t}
            text="Unable to Sign Up at this time"
          />
        )),
*/
