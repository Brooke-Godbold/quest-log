import PropTypes from "prop-types";

import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { supabaseStoragePath, supabaseUrl } from "../../../services/supabase";

import { useUpdateProfile } from "../../../query/profile/useUpdateProfile";
import { useUser } from "../../../query/auth/useUser";
import { useProfileByUser } from "../../../query/profile/useProfileByUser";

import Spinner from "../../../ui/spinner/Spinner";
import Notification from "../../../ui/notification/Notification.component";

import {
  Avatar,
  AvatarErrorContainer,
  AvatarUploadInput,
  StyledAccountAvatarSection,
  UsernameLabel,
} from "./AccountAvatarSection.styles";
import { FormError } from "../../../ui/form-error/FormError.styles";
import { MAX_FILE_SIZE_IN_BINARY_BYTES } from "../../../data/consts";

function AccountAvatarSection() {
  const {
    register,
    setError,
    formState: { errors },
  } = useForm();

  const { user } = useUser();
  const { profile, isGettingProfile } = useProfileByUser(user?.id);

  const { updateProfile, isLoading, isError } = useUpdateProfile(user?.id);

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

    updateProfile(profileData, {
      onSuccess: () =>
        toast((t) => <Notification toast={t} text="Uploaded Avatar!" />),
      onError: () =>
        toast.error((t) => (
          <Notification toast={t} text="Unable to upload Avatar at this time" />
        )),
    });
  }

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
