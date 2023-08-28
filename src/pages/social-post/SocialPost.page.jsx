import { useParams } from "react-router-dom";
import SocialFeedPost from "../../features/social/social-feed-post/SocialFeedPost.component";
import { StyledSocialPost } from "./SocialPost.styles";
import { useAllGames } from "../../features/account/account-profile-details-section/useAllGames";
import Spinner from "../../ui/spinner/Spinner";
import { usePostById } from "../../features/social/usePostById";
import SocialFeedContainer from "../../features/social/social-feed-container/SocialFeedContainer.component";

function SocialPost() {
  const { postId } = useParams();

  const { post, isGettingPost, isError: isPostError } = usePostById(postId);

  const {
    gameData,
    isLoading: isGamesLoading,
    isError: isGamesError,
  } = useAllGames();

  return (
    <StyledSocialPost>
      {isGamesLoading || isGamesError || isGettingPost || isPostError ? (
        <Spinner />
      ) : (
        <SocialFeedPost gameData={gameData} post={post} isDetail={true} />
      )}
      <SocialFeedContainer />
    </StyledSocialPost>
  );
}

export default SocialPost;
