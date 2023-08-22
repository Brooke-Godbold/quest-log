import PropTypes from "prop-types";

import { useForm } from "react-hook-form";

import {
  Avatar,
  AvatarErrorContainer,
  AvatarUploadInput,
  StyledAccountAvatarSection,
  UsernameLabel,
} from "./AccountAvatarSection.styles";
import { FormError } from "../../../ui/form-error/FormError.styles";
import { useUpdateProfile } from "../useUpdateProfile";
import { useUser } from "../../auth/useUser";
import { useProfileByUser } from "../account-layout/useProfileByUser";
import Spinner from "../../../ui/spinner/Spinner";
import { supabaseStoragePath, supabaseUrl } from "../../../services/supabase";

const MAX_FILE_SIZE_IN_BINARY_BYTES = 5242880;

function AccountAvatarSection() {
  const {
    register,
    setError,
    formState: { errors },
  } = useForm();

  const { user } = useUser();
  const { profile, isGettingProfile } = useProfileByUser(user ? user.id : null);

  const { updateProfile, isLoading, isError } = useUpdateProfile();

  function onUpload(e) {
    if (!profile || !e.target.files || !e.target.files[0]) return;

    const uploadedFile = e.target.files[0];

    if (
      uploadedFile.type !== "image/jpeg" &&
      uploadedFile.type !== "image/png"
    ) {
      setError("avatar", {
        type: "custom",
        message: "Avatars must be PNG or JPEG!",
      });
      return;
    }

    if (uploadedFile.size > MAX_FILE_SIZE_IN_BINARY_BYTES) {
      setError("avatar", {
        type: "custom",
        message: "Avatars must be below 5MB!",
      });
      return;
    }

    const profileData = {
      userId: profile.userId,
      avatar: uploadedFile,
      oldAvatarUrl: profile.avatarUrl,
    };

    updateProfile(profileData);
  }

  if (isGettingProfile) return <Spinner />;

  return (
    <StyledAccountAvatarSection>
      <Avatar
        src={
          profile && profile.avatarUrl
            ? profile.avatarUrl
            : `${supabaseUrl}/${supabaseStoragePath}/avatars/andy.jpg`
        }
      />
      <UsernameLabel>
        {profile && profile.username ? profile.username : "Anonymous"}
      </UsernameLabel>
      <AvatarUploadInput
        {...register("avatar")}
        type="file"
        id="avatar"
        disabled={isLoading}
        onChange={onUpload}
      />
      {((errors && errors.avatar) || isError) && (
        <AvatarErrorContainer>
          <FormError>Error Uploading Avatar</FormError>
        </AvatarErrorContainer>
      )}
    </StyledAccountAvatarSection>
  );
}

AccountAvatarSection.propTypes = {
  username: PropTypes.string,
};

export default AccountAvatarSection;
