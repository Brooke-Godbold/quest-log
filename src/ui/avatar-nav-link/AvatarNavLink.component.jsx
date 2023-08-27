import PropTypes from "prop-types";
import { useProfileByUser } from "../../features/account/account-layout/useProfileByUser";
import { supabaseStoragePath, supabaseUrl } from "../../services/supabase";
import Spinner from "../spinner/Spinner";
import {
  StyledAvatarNavLink,
  UserAvatar,
  UserName,
} from "./AvatarNavLink.styles";

function AvatarNavLink({ userId }) {
  const {
    profile,
    isGettingProfile,
    isError: isProfileError,
  } = useProfileByUser(userId);

  return (
    <StyledAvatarNavLink to={`/social/${userId}?view=posts`}>
      {isGettingProfile ? (
        <Spinner />
      ) : !profile || isProfileError ? (
        <>
          <UserAvatar
            src={`${supabaseUrl}/${supabaseStoragePath}/avatars/andy.jpg`}
          />
          <UserName>Anonymous</UserName>
        </>
      ) : (
        <>
          <UserAvatar src={profile.avatarUrl} />
          <UserName>{profile.username}</UserName>
        </>
      )}
    </StyledAvatarNavLink>
  );
}

AvatarNavLink.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default AvatarNavLink;
