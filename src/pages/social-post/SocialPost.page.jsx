import { useParams } from "react-router-dom";
import SocialFeedPost from "../../features/social/social-feed-post/SocialFeedPost.component";
import { StyledSocialPost } from "./SocialPost.styles";
import { useAllGames } from "../../features/account/account-profile-details-section/useAllGames";
import Spinner from "../../ui/spinner/Spinner";
import { usePostById } from "../../features/social/usePostById";
import SocialFeedContainer from "../../features/social/social-feed-container/SocialFeedContainer.component";
import { useUser } from "../../features/auth/useUser";
import { useIsBlocked } from "../../hooks/useIsBlocked";

function SocialPost() {
  const { postId } = useParams();

  const { post, isGettingPost, isError: isPostError } = usePostById(postId);

  const { user } = useUser();
  const { isBlocked, isLoadingBlocked } = useIsBlocked(post?.userId, user?.id);

  console.log(isBlocked);

  const {
    gameData,
    isLoading: isGamesLoading,
    isError: isGamesError,
  } = useAllGames();

  return (
    <StyledSocialPost>
      {isGamesLoading ||
      isGamesError ||
      isGettingPost ||
      isPostError ||
      isLoadingBlocked ? (
        <Spinner />
      ) : isBlocked ? null : (
        <SocialFeedPost gameData={gameData} post={post} isDetail={true} />
      )}
      <SocialFeedContainer />
    </StyledSocialPost>
  );
}

export default SocialPost;
