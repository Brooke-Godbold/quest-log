import PropTypes from "prop-types";
import AvatarNavLink from "../../../ui/avatar-nav-link/AvatarNavLink.component";
import {
  DetailLink,
  PostButtonsContainer,
  PostContent,
  PostCreatedTime,
  PostDetails,
  PostGameTag,
  RepliesCount,
  ReplyButton,
  StyledSocialFeedPost,
} from "./SocialFeedPost.styles";
import { format } from "date-fns";
import { useUser } from "../../auth/useUser";
import Modal from "../../../ui/modal/Modal.component";
import AddPostForm from "../add-post-form/AddPostForm.component";
import { useNavigate } from "react-router-dom";
import { useReplyByPostId } from "../useReplyByPostId";

function SocialFeedPost({ post, gameData, isDetail = false, isReply = false }) {
  const { isAuthenticated, user } = useUser();

  const navigate = useNavigate();

  const { replies } = useReplyByPostId(post.id);

  return (
    <StyledSocialFeedPost>
      <AvatarNavLink userId={post.userId} />
      <PostContent>{post.description}</PostContent>
      <PostDetails>
        {post.gameId && (
          <PostGameTag to={`/game/${post.gameId}`}>
            {gameData.filter((game) => game.id === post.gameId)[0].name}
          </PostGameTag>
        )}
        <PostCreatedTime>{`Posted at: ${format(
          new Date(post.created_at),
          "Pp"
        )}`}</PostCreatedTime>
      </PostDetails>
      {isAuthenticated && !isReply && (
        <PostButtonsContainer>
          {replies && replies.length > 0 && (
            <RepliesCount>{`${replies.length} replies!`}</RepliesCount>
          )}
          <Modal>
            <Modal.Open opens="reply">
              <ReplyButton>Reply</ReplyButton>
            </Modal.Open>
            <Modal.Window name="reply">
              <AddPostForm userId={user.id} postId={post.id} />
            </Modal.Window>
          </Modal>
          {isDetail ? (
            <ReplyButton onClick={() => navigate(-1)}>Back</ReplyButton>
          ) : (
            <DetailLink to={`/social/post/${post.id}`}>Detail</DetailLink>
          )}
        </PostButtonsContainer>
      )}
    </StyledSocialFeedPost>
  );
}

SocialFeedPost.propTypes = {
  post: PropTypes.object.isRequired,
  gameData: PropTypes.array.isRequired,
  isDetail: PropTypes.bool,
  isReply: PropTypes.bool,
};

export default SocialFeedPost;
