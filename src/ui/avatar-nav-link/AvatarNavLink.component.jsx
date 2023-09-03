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

function AvatarNavLink({ userId, gameId, view = "posts", gameData }) {
  const {
    profile,
    isGettingProfile,
    isError: isProfileError,
  } = useProfileByUser(userId);

  return (
    <StyledAvatarNavLink
      to={
        userId
          ? `/social/${userId}?view=${view}${gameId ? `&game=${gameId}` : ""}`
          : gameData
          ? `/game/${gameData.id}`
          : ""
      }
    >
      {userId ? (
        isGettingProfile ? (
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
        )
      ) : gameData ? (
        <>
          <UserAvatar src={gameData.imageUrl} />
          <UserName>{gameData.name}</UserName>
          <DisplayName>{gameData.year}</DisplayName>
        </>
      ) : null}
    </StyledAvatarNavLink>
  );
}

AvatarNavLink.propTypes = {
  userId: PropTypes.string,
  gameId: PropTypes.number,
  view: PropTypes.string,
  gameData: PropTypes.object,
};

export default AvatarNavLink;
