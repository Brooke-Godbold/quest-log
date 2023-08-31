import { useUser } from "../../auth/useUser";
import { useProfileByUser } from "../account-layout/useProfileByUser";
import {
  ProfileDetailsLabel,
  ProfileDetailsRow,
} from "../account-profile-details-section/AccountProfileDetailsSection.styles";
import { useUpdateProfile } from "../useUpdateProfile";
import {
  PrivacySelect,
  StyledAccountPrivacySection,
} from "./AccountPrivacy.styles";

function AccountPrivacySection() {
  const { user } = useUser();
  const { profile } = useProfileByUser(user?.id);

  const { updateProfile, isLoading: isUpdating } = useUpdateProfile(user?.id);

  function onSetMessaging(e) {
    updateProfile({ userId: user.id, data: { messaging: e.target.value } });
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
