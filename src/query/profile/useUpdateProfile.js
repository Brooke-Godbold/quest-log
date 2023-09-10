import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile as updateProfileApi } from '../../services/apiProfile';

export function useUpdateProfile(profileUserId, username) {
  const queryClient = useQueryClient();

  const {
    mutate: updateProfile,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: updateProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`profile_${profileUserId}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`profile_${username}`],
      });
    },
  });

  return { updateProfile, isLoading, isError };
}
