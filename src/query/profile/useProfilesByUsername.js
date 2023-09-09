import { useQuery } from '@tanstack/react-query';
import { getProfileByUsername } from '../../services/apiProfile';

export function useProfilesByUsername(username) {
  const {
    isLoading: isGettingProfile,
    isFetching: isFetchingProfile,
    data: profile,
    isError,
  } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => getProfileByUsername(username),
    retry: false,
  });

  return { isGettingProfile, profile, isError, isFetchingProfile };
}
