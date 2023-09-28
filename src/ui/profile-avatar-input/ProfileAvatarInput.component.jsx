import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';

import {
  Avatar,
  AvatarUploadInput,
  UsernameLabel,
} from '../../features/account/account-avatar-section/AccountAvatarSection.styles';

import { supabaseStoragePath, supabaseUrl } from '../../services/supabase';

function ProfileAvatarInput({ register, isLoading, profile, onUpload }) {
  return (
    <>
      {profile ? (
        <Avatar
          src={
            profile.avatarUrl
              ? profile.avatarUrl
              : `${supabaseUrl}/${supabaseStoragePath}/avatars/andy.jpg`
          }
        />
      ) : (
        <Spinner />
      )}
      <UsernameLabel>
        {profile && profile.username ? profile.username : 'Anonymous'}
      </UsernameLabel>
      <AvatarUploadInput
        {...register('avatar')}
        type="file"
        id="avatar"
        disabled={isLoading}
        onChange={onUpload}
      />
    </>
  );
}

ProfileAvatarInput.propTypes = {
  register: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  profile: PropTypes.profile.isRequired,
  onUpload: PropTypes.func.isRequired,
};

export default ProfileAvatarInput;
