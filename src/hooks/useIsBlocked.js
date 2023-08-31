import { useEffect, useState } from "react";
import { useProfileByUser } from "../features/account/account-layout/useProfileByUser";

export function useIsBlocked(viewedUserId, currentUserId) {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoadingBlocked, setIsLoadingBlocked] = useState(true);

  const {
    profile: viewedProfile,
    isFetchingProfile: isFetchingViewedProfile,
    isGettingProfile: isGettingViewedProfile,
  } = useProfileByUser(viewedUserId);

  const {
    profile: currentProfile,
    isFetchingProfile: isFetchingUserProfile,
    isGettingProfile: isGettingUserProfile,
  } = useProfileByUser(currentUserId);

  useEffect(() => {
    function handleCheckBlocked() {
      if (!currentUserId) {
        setIsBlocked(false);
        setIsLoadingBlocked(false);
        return;
      }

      const isLoadingBlocked =
        isGettingViewedProfile ||
        isFetchingViewedProfile ||
        !viewedProfile ||
        (currentUserId &&
          (isFetchingUserProfile || isGettingUserProfile || !currentProfile));

      setIsLoadingBlocked(isLoadingBlocked);

      const isBlocked =
        currentProfile?.blocked.includes(viewedUserId) ||
        viewedProfile?.blocked.includes(currentUserId) ||
        false;

      setIsBlocked(isBlocked);
    }

    handleCheckBlocked();
  });

  return { isBlocked, isLoadingBlocked };
}
