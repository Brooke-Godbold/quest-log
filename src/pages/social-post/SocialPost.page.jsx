import { useParams } from "react-router-dom";

import { useAllGames } from "../../query/game/useAllGames";
import { usePostById } from "../../query/post/usePostById";
import { useUser } from "../../query/auth/useUser";
import { useIsBlocked } from "../../hooks/useIsBlocked";

import SocialFeedPost from "../../features/social/social-feed-post/SocialFeedPost.component";
import SocialFeedContainer from "../../features/social/social-feed-container/SocialFeedContainer.component";
import Spinner from "../../ui/spinner/Spinner";

import { StyledSocialPost } from "./SocialPost.styles";

function SocialPost() {
  const { postId } = useParams();

  const { post, isGettingPost, isError: isPostError } = usePostById(postId);

  const { user } = useUser();
  const { isBlocked, isLoadingBlocked } = useIsBlocked(post?.userId, user?.id);

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
