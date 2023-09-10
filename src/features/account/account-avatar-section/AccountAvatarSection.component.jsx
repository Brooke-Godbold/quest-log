import PropTypes from 'prop-types';

import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

import { supabaseStoragePath, supabaseUrl } from '../../../services/supabase';

import { useUpdateProfile } from '../../../query/profile/useUpdateProfile';
import { useUser } from '../../../query/auth/useUser';
import { useProfileByUser } from '../../../query/profile/useProfileByUser';

import Spinner from '../../../ui/spinner/Spinner';
import Notification from '../../../ui/notification/Notification.component';

import {
  Avatar,
  AvatarUploadInput,
  StyledAccountAvatarSection,
  UsernameLabel,
} from './AccountAvatarSection.styles';

import { validateFile } from '../../../utils/validateFile';
import { onErrorToast } from '../../../utils/onErrorToast';

function AccountAvatarSection() {
  const {
    register,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const { user } = useUser();
  const { profile, isGettingProfile } = useProfileByUser(user?.id);

  const { updateProfile, isLoading } = useUpdateProfile(
    user?.id,
    profile?.username
  );

  function onUpload(e) {
    if (!profile || !e.target.files || !e.target.files[0]) return;

    const uploadedFile = e.target.files[0];

    if (!validateFile(uploadedFile, setError)) return;

    const profileData = {
      userId: profile.userId,
      avatar: uploadedFile,
      oldAvatarUrl: profile.avatarUrl,
    };

    updateProfile(profileData, {
      onSuccess: () => toast(() => <Notification text="Uploaded Avatar!" />),
      onError: () =>
        toast.error(() => (
          <Notification text="Unable to upload Avatar at this time" />
        )),
    });
  }

  useEffect(() => {
    if (errors.image) {
      onErrorToast(errors, clearErrors);
    }
  }, [errors, clearErrors]);

  if (isGettingProfile) return <Spinner />;

  return (
    <StyledAccountAvatarSection>
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
    </StyledAccountAvatarSection>
  );
}

AccountAvatarSection.propTypes = {
  username: PropTypes.string,
};

export default AccountAvatarSection;
