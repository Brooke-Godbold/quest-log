import UserHeader from '../../features/social/user-header/UserHeader.component';
import SocialFeedContainer from '../../features/social/social-feed-container/SocialFeedContainer.component';
import Spinner from '../../ui/spinner/Spinner';

import { StyledUser } from './User.styles';

import { usePersonalization } from '../../contexts/PersonalizationContext';

function User() {
  const { isPersonalizable, personalization, isPersonalizationLoaded } =
    usePersonalization();

  return (
    <StyledUser
      $isPersonalizable={isPersonalizable}
      $secondaryColor={personalization?.secondaryColor}
    >
      {isPersonalizable && !isPersonalizationLoaded ? (
        <Spinner />
      ) : (
        <>
          <UserHeader />
          <SocialFeedContainer />
        </>
      )}
    </StyledUser>
  );
}

export default User;
