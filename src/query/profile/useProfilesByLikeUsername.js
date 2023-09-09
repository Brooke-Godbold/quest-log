import { useQuery } from '@tanstack/react-query';
import { getProfilesByUsername } from '../../services/apiProfile';

export function useProfilesByLikeUsername(username) {
  const {
    isLoading: isGettingProfiles,
    isFetching: isFetchingProfiles,
    data: profiles,
    isError,
  } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => getProfilesByUsername(username),
    retry: false,
  });

  return { isGettingProfiles, profiles, isError, isFetchingProfiles };
}
