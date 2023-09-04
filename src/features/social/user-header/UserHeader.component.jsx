import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useProfileByUser } from "../../../query/profile/useProfileByUser";
import { useAllGames } from "../../../query/game/useAllGames";
import { useUser } from "../../../query/auth/useUser";
import { useUpdateProfile } from "../../../query/profile/useUpdateProfile";
import { useConversations } from "../../../contexts/ConversationsContext";
import { useMessages } from "../../../query/message/useMessages";
import { useIsBlocked } from "../../../hooks/useIsBlocked";
import { useIsFollowing } from "../../../hooks/useIsFollowing";

import { HiPlus } from "react-icons/hi";
import { HiCheck } from "react-icons/hi";
import { FaTwitch } from "react-icons/fa";
import { GrYoutube } from "react-icons/gr";
import { RiKickFill } from "react-icons/ri";
import { ImBlocked } from "react-icons/im";
import { BiMessageDetail } from "react-icons/bi";

import Spinner from "../../../ui/spinner/Spinner";
import Modal from "../../../ui/modal/Modal.component";
import Notification from "../../../ui/notification/Notification.component";
import DirectMessage from "../direct-message/DirectMessage.component";

import {
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
  DisplayName,
  AddNewPostButton,
} from "./UserHeader.styles";

import { kickUrl, twitchUrl, youtubeUrl } from "../../../data/consts";
import AddPostButton from "../add-post-button/AddPostButton.component";

function UserHeader() {
  const { isAuthenticated, user } = useUser();

  const { userId } = useParams();

  const { gameData } = useAllGames();

  const { profile: viewedProfile, isError } = useProfileByUser(userId);
  const { profile: userProfile } = useProfileByUser(user?.id);
  const { updateProfile, isLoading: isUpdatingProfile } = useUpdateProfile(
    userProfile?.userId
  );

  const { conversations } = useMessages(user?.id);
  const { setCurrentConversation } = useConversations();
  const navigate = useNavigate();

  const { isBlocked, isLoadingBlocked } = useIsBlocked(
    viewedProfile?.userId,
    user?.id
  );

  const { isFollowing } = useIsFollowing(user?.id, userId);
  const { isFollowing: isFollowed } = useIsFollowing(userId, user?.id);
  const mutualFollowers = user && isFollowing && isFollowed;

  const messagingEnabled =
    viewedProfile?.messaging === 2 ||
    (mutualFollowers && viewedProfile?.messaging === 1);

  function onFollow() {
    if (!userProfile) return;

    const following = userProfile.following.includes(userId)
      ? userProfile.following.filter((followedUser) => followedUser !== userId)
      : [...userProfile.following, userId];

    updateProfile(
      {
        userId: userProfile.userId,
        data: { following },
      },
      {
        onSuccess: () => {
          toast((t) => (
            <Notification
              toast={t}
              text={
                following.includes(viewedProfile.userId)
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
              text={`Unable to follow ${viewedProfile.username} right now`}
            />
          )),
      }
    );
  }

  function onGotoMessages() {
    setCurrentConversation(viewedProfile.userId);
    navigate("/messages", { replace: true });
  }

  function onBlock() {
    if (!userProfile) return;

    const blocked = userProfile.blocked.includes(userId)
      ? userProfile.blocked.filter((blockedUser) => blockedUser !== userId)
      : [...userProfile.blocked, userId];

    const following = blocked.includes(userId)
      ? userProfile.following.filter((followedUser) => followedUser !== userId)
      : userProfile.following;

    updateProfile(
      {
        userId: userProfile.userId,
        data: { blocked, following },
      },
      {
        onSuccess: () => {
          toast((t) => (
            <Notification
              toast={t}
              text={
                blocked.includes(viewedProfile.userId)
                  ? `Blocked ${viewedProfile.username}`
                  : `Unblocked ${viewedProfile.username}`
              }
            />
          ));
        },
        onError: () =>
          toast.error((t) => (
            <Notification
              toast={t}
              text={`Unable to block ${viewedProfile.username} right now`}
            />
          )),
      }
    );
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
              <UserName>{viewedProfile.displayName}</UserName>
              {viewedProfile.username !== viewedProfile.displayName && (
                <DisplayName>{`#${viewedProfile.username}`}</DisplayName>
              )}
              {isAuthenticated &&
                user &&
                user.id !== userId &&
                conversations && (
                  <UserActionsContainer>
                    <ActionButton
                      $interactable={true}
                      disabled={isUpdatingProfile || isLoadingBlocked}
                      onClick={onBlock}
                      $active={userProfile?.blocked.includes(userId)}
                    >
                      <ImBlocked />
                    </ActionButton>
                    <ActionButton
                      $interactable={!isBlocked}
                      disabled={
                        isUpdatingProfile || isBlocked || isLoadingBlocked
                      }
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
                      <ActionButton
                        $interactable={!isBlocked && messagingEnabled}
                        disabled={
                          isUpdatingProfile ||
                          isBlocked ||
                          isLoadingBlocked ||
                          !messagingEnabled
                        }
                        onClick={onGotoMessages}
                      >
                        <BiMessageDetail />
                      </ActionButton>
                    ) : (
                      <Modal>
                        <Modal.Open opens="directMessage">
                          <ActionButton
                            $interactable={!isBlocked && messagingEnabled}
                            disabled={
                              isUpdatingProfile ||
                              isBlocked ||
                              isLoadingBlocked ||
                              !messagingEnabled
                            }
                          >
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
          <AddPostButton
            isActive={!userId || userId === user.id}
            styledPostButton={<AddNewPostButton>Add New Post</AddNewPostButton>}
          />
        </>
      )}
    </StyledUserHeader>
  );
}

export default UserHeader;
