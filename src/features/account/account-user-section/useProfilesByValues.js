import { useQuery } from "@tanstack/react-query";
import { getProfilesByValues } from "../../../services/apiProfile";

export function useProfilesByValues(queryData) {
  const {
    isLoading: isGettingProfiles,
    isFetching: isFetchingProfiles,
    data: profiles,
    isError,
  } = useQuery({
    queryKey: [`profile_${queryData.column}_${queryData.values}`],
    queryFn: () => getProfilesByValues(queryData),
    retry: false,
  });

  return { isGettingProfiles, profiles, isError, isFetchingProfiles };
}
