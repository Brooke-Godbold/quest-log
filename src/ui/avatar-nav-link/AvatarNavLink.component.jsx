import PropTypes from "prop-types";

import { useProfileByUser } from "../../query/profile/useProfileByUser";

import { supabaseStoragePath, supabaseUrl } from "../../services/supabase";

import Spinner from "../spinner/Spinner";

import {
  DisplayName,
  StyledAvatarNavLink,
  UserAvatar,
  UserName,
} from "./AvatarNavLink.styles";

function AvatarNavLink({ userId, gameId, view = "posts" }) {
  const {
    profile,
    isGettingProfile,
    isError: isProfileError,
  } = useProfileByUser(userId);

  return (
    <StyledAvatarNavLink
      to={
        userId &&
        `/social/${userId}?view=${view}${gameId ? `&game=${gameId}` : ""}`
      }
    >
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
          <UserName>{profile.displayName}</UserName>
          {profile.displayName !== profile.username && (
            <DisplayName>{`#${profile.username}`}</DisplayName>
          )}
        </>
      )}
    </StyledAvatarNavLink>
  );
}

AvatarNavLink.propTypes = {
  userId: PropTypes.string.isRequired,
  gameId: PropTypes.number,
  view: PropTypes.string,
};

export default AvatarNavLink;
