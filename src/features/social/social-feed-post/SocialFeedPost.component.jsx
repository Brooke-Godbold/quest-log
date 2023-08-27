import PropTypes from "prop-types";
import AvatarNavLink from "../../../ui/avatar-nav-link/AvatarNavLink.component";
import {
  PostContent,
  PostCreatedTime,
  PostDetails,
  PostGameTag,
  StyledSocialFeedPost,
} from "./SocialFeedPost.styles";
import { format } from "date-fns";

function SocialFeedPost({ post, gameData }) {
  return (
    <StyledSocialFeedPost>
      <AvatarNavLink userId={post.userId} />
      <PostContent>{post.description}</PostContent>
      <PostDetails>
        <PostGameTag to={`/game/${post.gameId}`}>
          {gameData.filter((game) => game.id === post.gameId)[0].name}
        </PostGameTag>
        <PostCreatedTime>{`Posted at: ${format(
          new Date(post.created_at),
          "Pp"
        )}`}</PostCreatedTime>
      </PostDetails>
    </StyledSocialFeedPost>
  );
}

//new Date(post.created_at)

SocialFeedPost.propTypes = {
  post: PropTypes.object.isRequired,
  gameData: PropTypes.array.isRequired,
};

export default SocialFeedPost;
