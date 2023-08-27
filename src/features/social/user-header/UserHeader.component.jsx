import { useParams } from "react-router-dom";
import Spinner from "../../../ui/spinner/Spinner";
import { useProfileByUser } from "../../account/account-layout/useProfileByUser";
import { useAllGames } from "../../account/account-profile-details-section/useAllGames";

import { HiPlus } from "react-icons/hi";
//import { HiCheck } from "react-icons/hi";

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

function UserHeader() {
  const { isAuthenticated, user } = useUser();

  const { userId } = useParams();

  const { profile, isFetchingProfile, isGettingProfile, isError } =
    useProfileByUser(userId);
  const { gameData, isLoading: isLoadingGames } = useAllGames();

  const isLoadingProfile = isFetchingProfile || isGettingProfile;

  return (
    <StyledUserHeader>
      {isLoadingProfile ? (
        <Spinner />
      ) : isError ? (
        <UserHeaderError>We couldn&apos;t find that one...</UserHeaderError>
      ) : (
        <>
          <UserProfile>
            <UserMain>
              <UserAvatar src={profile.avatarUrl} />
              <UserName>{profile.username}</UserName>
              {isAuthenticated && user && user.id !== userId && (
                <FollowButton $following={false}>
                  Follow <HiPlus />
                </FollowButton>
              )}
            </UserMain>
            <UserBio>{profile.bio}</UserBio>
            {isLoadingGames || isLoadingProfile ? (
              <Spinner />
            ) : (
              <CurrentlyPlayingContainer>
                {profile.currentGames && (
                  <>
                    <Heading>Currently Playing</Heading>
                    {profile.currentGames.map((gameId) => (
                      <CurrentlyPlaying key={gameId} to={`/game/${gameId}`}>
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
            profile && (
              <Modal>
                <Modal.Open opens="addPost">
                  <AddNewPostButton>Add New Post</AddNewPostButton>
                </Modal.Open>
                <Modal.Window name="addPost">
                  <AddPostForm
                    gameData={gameData}
                    currentGames={profile.currentGames}
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
