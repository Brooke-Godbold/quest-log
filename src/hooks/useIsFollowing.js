import { useEffect, useState } from "react";
import { useProfileByUser } from "../features/account/account-layout/useProfileByUser";

export function useIsFollowing(userIdA, userIdB) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoadingFollowing, setIsLoadingFollowing] = useState(true);

  const { profile, isFetchingProfile, isGettingProfile } =
    useProfileByUser(userIdA);

  useEffect(() => {
    function handleCheckFollowing() {
      if (!userIdA) {
        setIsFollowing(false);
        setIsLoadingFollowing(false);
        return;
      }

      const isLoadingFollowing =
        isFetchingProfile || isGettingProfile || (userIdA && !profile);

      setIsLoadingFollowing(isLoadingFollowing);

      const isFollowing = profile?.following.includes(userIdB);

      setIsFollowing(isFollowing);
    }

    handleCheckFollowing();
  });

  return { isFollowing, isLoadingFollowing };
}
