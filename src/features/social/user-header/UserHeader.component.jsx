import { useParams } from "react-router-dom";
import Spinner from "../../../ui/spinner/Spinner";
import { useProfileByUser } from "../../account/account-layout/useProfileByUser";
import { useAllGames } from "../../account/account-profile-details-section/useAllGames";

import { HiPlus } from "react-icons/hi";
import { HiCheck } from "react-icons/hi";

import {
  AddNewPostButton,
  CurrentlyPlaying,
  CurrentlyPlayingContainer,
  FollowButton,
  Heading,
  StyledUserHeader,
  UserAvatar,
  UserBio,
  UserHeaderError,
  UserMain,
  UserName,
  UserProfile,
} from "./UserHeader.styles";
import { useUser } from "../../auth/useUser";
import Modal from "../../../ui/modal/Modal.component";
import AddPostForm from "../add-post-form/AddPostForm.component";
import { useUpdateProfile } from "../../account/useUpdateProfile";

function UserHeader() {
  const { isAuthenticated, user } = useUser();

  const { userId } = useParams();

  const {
    profile: viewedProfile,
    isFetchingProfile: isFetchingViewedProfile,
    isGettingProfile: isGettingViewedProfile,
    isError,
  } = useProfileByUser(userId);
  const { gameData, isLoading: isLoadingGames } = useAllGames();

  const isLoadingViewedProfile =
    isFetchingViewedProfile || isGettingViewedProfile;

  const { profile: userProfile } = useProfileByUser(user?.id);

  const { updateProfile, isLoading: isUpdatingProfile } = useUpdateProfile(
    userProfile?.userId
  );

  function onFollow() {
    if (!userProfile) return;

    const newFollowing = userProfile.following.includes(userId)
      ? userProfile.following.filter((followedUser) => followedUser !== userId)
      : [...userProfile.following, userId];

    updateProfile({
      userId: userProfile.userId,
      data: { following: newFollowing },
    });
  }

  //<HiPlus />

  return (
    <StyledUserHeader>
      {isLoadingViewedProfile ? (
        <Spinner />
      ) : isError ? (
        <UserHeaderError>We couldn&apos;t find that one...</UserHeaderError>
      ) : (
        <>
          <UserProfile>
            <UserMain>
              <UserAvatar src={viewedProfile.avatarUrl} />
              <UserName>{viewedProfile.username}</UserName>
              {isAuthenticated && user && user.id !== userId && (
                <FollowButton
                  disabled={isUpdatingProfile}
                  onClick={onFollow}
                  $following={userProfile?.following.includes(userId)}
                >
                  {userProfile?.following.includes(userId) ? (
                    <>
                      Following <HiCheck />
                    </>
                  ) : (
                    <>
                      Follow <HiPlus />
                    </>
                  )}
                </FollowButton>
              )}
            </UserMain>
            <UserBio>{viewedProfile.bio}</UserBio>
            {isLoadingGames || isLoadingViewedProfile ? (
              <Spinner />
            ) : (
              <CurrentlyPlayingContainer>
                {viewedProfile.currentGames && (
                  <>
                    <Heading>Currently Playing</Heading>
                    {viewedProfile.currentGames.map((gameId) => (
                      <CurrentlyPlaying
                        key={gameId}
                        to={`/game/${gameId}?username=${viewedProfile.username}`}
                      >
                        {gameData.filter((game) => game.id === gameId)[0].name}
                      </CurrentlyPlaying>
                    ))}
                  </>
                )}
              </CurrentlyPlayingContainer>
            )}
          </UserProfile>
          {isAuthenticated &&
            user &&
            user.id === userId &&
            gameData &&
            viewedProfile && (
              <Modal>
                <Modal.Open opens="addPost">
                  <AddNewPostButton>Add New Post</AddNewPostButton>
                </Modal.Open>
                <Modal.Window name="addPost">
                  <AddPostForm
                    gameData={gameData}
                    currentGames={viewedProfile.currentGames}
                    userId={user.id}
                  />
                </Modal.Window>
              </Modal>
            )}
        </>
      )}
    </StyledUserHeader>
  );
}

export default UserHeader;
