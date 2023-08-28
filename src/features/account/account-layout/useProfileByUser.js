import { useQuery } from "@tanstack/react-query";
import { getProfileByUserId } from "../../../services/apiProfile";

export function useProfileByUser(userId) {
  const {
    isLoading: isGettingProfile,
    isFetching: isFetchingProfile,
    data: profile,
    isError,
  } = useQuery({
    queryKey: [`profile_${userId}`],
    queryFn: () => getProfileByUserId(userId),
    retry: false,
  });

  return { isGettingProfile, profile, isError, isFetchingProfile };
}
