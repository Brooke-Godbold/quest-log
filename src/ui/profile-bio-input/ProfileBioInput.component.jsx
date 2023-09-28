import PropTypes from 'prop-types';

import {
  AccountProfileBio,
  ProfileDetailsLabel,
} from '../../features/account/account-profile-details-section/AccountProfileDetailsSection.styles';
import TextCount from '../text-count/TextCount.component';

import { BIO_MAX_LENGTH } from '../../data/consts';

function ProfileBioInput({ register, isLoading, profile, watchBio }) {
  return (
    <>
      <ProfileDetailsLabel>Bio</ProfileDetailsLabel>
      <AccountProfileBio
        id="bio"
        type="text"
        {...register('bio', {
          maxLength: {
            value: BIO_MAX_LENGTH,
            message: `Bio cannot be longer than ${BIO_MAX_LENGTH} characters!`,
          },
        })}
        defaultValue={profile?.bio}
        disabled={isLoading}
      />
      <TextCount value={watchBio} maxLength={BIO_MAX_LENGTH} />
    </>
  );
}

ProfileBioInput.propTypes = {
  register: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
  watchBio: PropTypes.string.isRequired,
};

export default ProfileBioInput;
