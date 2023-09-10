import { toast } from 'react-hot-toast';

import { useUser } from '../../../query/auth/useUser';
import { useProfileByUser } from '../../../query/profile/useProfileByUser';
import { useUpdateProfile } from '../../../query/profile/useUpdateProfile';

import Notification from '../../../ui/notification/Notification.component';

import {
  ProfileDetailsLabel,
  ProfileDetailsRow,
} from '../account-profile-details-section/AccountProfileDetailsSection.styles';
import {
  PrivacySelect,
  StyledAccountPrivacySection,
} from './AccountPrivacy.styles';

function AccountPrivacySection() {
  const { user } = useUser();
  const { profile } = useProfileByUser(user?.id);

  const { updateProfile, isLoading: isUpdating } = useUpdateProfile(
    user?.id,
    profile?.username
  );

  function onSetMessaging(e) {
    updateProfile(
      { userId: user.id, data: { messaging: e.target.value } },
      {
        onSuccess: () =>
          toast((t) => (
            <Notification toast={t} text="Updated Privacy Settings!" />
          )),
        onError: () =>
          toast.error((t) => (
            <Notification
              toast={t}
              text="Unable to update Privacy Settings right now"
            />
          )),
      }
    );
  }

  return (
    <StyledAccountPrivacySection>
      <ProfileDetailsRow>
        <ProfileDetailsLabel>Direct Messaging</ProfileDetailsLabel>
        <PrivacySelect
          disabled={!profile || isUpdating}
          onChange={onSetMessaging}
          value={profile?.messaging || 0}
        >
          <option value={0}>No-one</option>
          <option value={1}>Mutual Followers</option>
          <option value={2}>Everyone</option>
        </PrivacySelect>
      </ProfileDetailsRow>
    </StyledAccountPrivacySection>
  );
}

export default AccountPrivacySection;
