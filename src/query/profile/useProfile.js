import { useQuery } from "@tanstack/react-query";
import { getProfileByEmail } from "../../services/apiProfile";

export function useProfile(email) {
  const { isLoading: isGettingProfile, data: profile } = useQuery({
    queryKey: ["profile", email],
    queryFn: () => getProfileByEmail(email),
    retry: false,
  });

  return { isGettingProfile, profile };
}
