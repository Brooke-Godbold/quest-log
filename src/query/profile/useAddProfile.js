import { useMutation } from "@tanstack/react-query";
import { addProfile as addProfileApi } from "../../services/apiProfile";

export function useAddProfile() {
  const { mutate: addProfile, isLoading: isAddingProfile } = useMutation({
    mutationFn: addProfileApi,
    onError: (err) => console.log(err),
  });

  return { addProfile, isAddingProfile };
}
