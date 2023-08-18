import { useMutation } from "@tanstack/react-query";
import { addProfile as addProfileApi } from "../../../services/apiProfile";

export function useAddProfile() {
  const { mutate: addProfile, isLoading: isAddingProfile } = useMutation({
    mutationFn: ({ email, userId }) => addProfileApi({ email, userId }),
    onError: (err) => console.log(err),
  });

  return { addProfile, isAddingProfile };
}
