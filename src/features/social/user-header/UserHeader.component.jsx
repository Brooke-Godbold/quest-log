import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../ui/spinner/Spinner";
import { useProfileByUser } from "../../account/account-layout/useProfileByUser";
import { useAllGames } from "../../account/account-profile-details-section/useAllGames";

import { toast } from "react-hot-toast";

import { HiPlus } from "react-icons/hi";
import { HiCheck } from "react-icons/hi";
import { FaTwitch } from "react-icons/fa";
import { GrYoutube } from "react-icons/gr";
import { RiKickFill } from "react-icons/ri";
import { ImBlocked } from "react-icons/im";
import { BiMessageDetail } from "react-icons/bi";

import {
  AddNewPostButton,
  CurrentlyPlaying,
  CurrentlyPlayingContainer,
  ActionButton,
  Heading,
  SocialMediaButton,
  SocialMediaContainer,
  StyledUserHeader,
  UserActionsContainer,
  UserAvatar,
  UserBio,
  UserDetailsContainer,
  UserHeaderError,
  UserMain,
  UserName,
  UserProfile,
} from "./UserHeader.styles";
import { useUser } from "../../auth/useUser";
import Modal from "../../../ui/modal/Modal.component";
import AddPostForm from "../add-post-form/AddPostForm.component";
import { useUpdateProfile } from "../../account/useUpdateProfile";
import { kickUrl, twitchUrl, youtubeUrl } from "../../../data/consts";
import Notification from "../../../ui/notification/Notification.component";
import { useConversations } from "../../../contexts/ConversationsContext";
import { useMessages } from "../../messages/useMessages";
import DirectMessage from "../direct-message/DirectMessage.component";

function UserHeader() {
  const { isAuthenticated, user } = useUser();

  const { userId } = useParams();

  const { profile: viewedProfile, isError } = useProfileByUser(userId);
  const { gameData } = useAllGames();

  const { profile: userProfile } = useProfileByUser(user?.id);

  const { updateProfile, isLoading: isUpdatingProfile } = useUpdateProfile(
    userProfile?.userId
  );

  const { conversations } = useMessages(user?.id);
  const { setCurrentConversation } = useConversations();

  const navigate = useNavigate();

  function onFollow() {
    if (!userProfile) return;

    const newFollowing = userProfile.following.includes(userId)
      ? userProfile.following.filter((followedUser) => followedUser !== userId)
      : [...userProfile.following, userId];

    updateProfile(
      {
        userId: userProfile.userId,
        data: { following: newFollowing },
      },
      {
        onSuccess: () => {
          toast((t) => (
            <Notification
              toast={t}
              text={
                newFollowing.includes(viewedProfile.userId)
                  ? `Now following ${viewedProfile.username}!`
                  : `Unfollowed ${viewedProfile.username}`
              }
            />
          ));
        },
        onError: () =>
          toast.error((t) => (
            <Notification
              toast={t}
              text={`Unable to follow ${viewedProfile.username}`}
            />
          )),
      }
    );
  }

  function onGotoMessages() {
    setCurrentConversation(viewedProfile.userId);
    navigate("/messages", { replace: true });
  }

  return (
    <StyledUserHeader>
      {!viewedProfile ? (
        <Spinner />
      ) : isError ? (
        <UserHeaderError>We couldn&apos;t find that one...</UserHeaderError>
      ) : (
        <>
          <UserProfile>
            <UserMain>
              <UserAvatar src={viewedProfile.avatarUrl} />
              <UserName>{viewedProfile.username}</UserName>
              {isAuthenticated &&
                user &&
                user.id !== userId &&
                conversations && (
                  <UserActionsContainer>
                    <ActionButton>
                      <ImBlocked />
                    </ActionButton>
                    <ActionButton
                      disabled={isUpdatingProfile}
                      onClick={onFollow}
                      $active={userProfile?.following.includes(userId)}
                    >
                      {userProfile?.following.includes(userId) ? (
                        <HiCheck />
                      ) : (
                        <HiPlus />
                      )}
                    </ActionButton>
                    {conversations.filter(
                      (c) =>
                        c.userIdA === viewedProfile.userId ||
                        c.userIdB === viewedProfile.userId
                    )[0] ? (
                      <ActionButton onClick={onGotoMessages}>
                        <BiMessageDetail />
                      </ActionButton>
                    ) : (
                      <Modal>
                        <Modal.Open opens="directMessage">
                          <ActionButton>
                            <BiMessageDetail />
                          </ActionButton>
                        </Modal.Open>
                        <Modal.Window name="directMessage">
                          <DirectMessage
                            username={viewedProfile.username}
                            receiverId={viewedProfile.userId}
                          />
                        </Modal.Window>
                      </Modal>
                    )}
                  </UserActionsContainer>
                )}
            </UserMain>
            <UserDetailsContainer>
              <UserBio>{viewedProfile.bio}</UserBio>
              <SocialMediaContainer>
                <SocialMediaButton
                  $active={viewedProfile.twitch}
                  href={
                    viewedProfile.twitch &&
                    `${twitchUrl}${viewedProfile.twitch}`
                  }
                  target="_blank"
                >
                  <FaTwitch />
                </SocialMediaButton>
                <SocialMediaButton
                  $active={viewedProfile.youtube}
                  href={
                    viewedProfile.youtube &&
                    `${youtubeUrl}${viewedProfile.youtube}`
                  }
                  target="_blank"
                >
                  <GrYoutube />
                </SocialMediaButton>
                <SocialMediaButton
                  $active={viewedProfile.kick}
                  href={viewedProfile.kick && `${kickUrl}${viewedProfile.kick}`}
                  target="_blank"
                >
                  <RiKickFill />
                </SocialMediaButton>
              </SocialMediaContainer>
            </UserDetailsContainer>
            {!gameData || !viewedProfile ? (
              <Spinner />
            ) : (
              <CurrentlyPlayingContainer>
                {viewedProfile.currentGames?.length > 0 && (
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
