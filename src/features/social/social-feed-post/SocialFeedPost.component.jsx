import PropTypes from "prop-types";
import AvatarNavLink from "../../../ui/avatar-nav-link/AvatarNavLink.component";
import {
  DetailLink,
  PostButtonsContainer,
  PostContent,
  PostCreatedTime,
  PostDetails,
  RepliesCount,
  ReplyButton,
  StyledSocialFeedPost,
} from "./SocialFeedPost.styles";
import { format } from "date-fns";
import { useUser } from "../../auth/useUser";
import Modal from "../../../ui/modal/Modal.component";
import AddPostForm from "../add-post-form/AddPostForm.component";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useReplyByPostId } from "../useReplyByPostId";
import Votes from "../../../ui/votes/Votes.component";
import { useUpdatePost } from "../useUpdatePost";
import GameTag from "../../../ui/game-tag/GameTag.component";

function SocialFeedPost({
  post,
  id,
  gameData,
  isDetail = false,
  parentPostId = null,
}) {
  const { isAuthenticated, user } = useUser();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { replies } = useReplyByPostId(post.id);

  function onDetail() {
    searchParams.set("post", post.id);
    setSearchParams(searchParams);
  }

  const { updatePost } = useUpdatePost();

  return (
    <StyledSocialFeedPost id={id}>
      <AvatarNavLink userId={post.userId} />
      <PostContent>{post.description}</PostContent>
      <PostDetails>
        {post.gameId && (
          <GameTag to={`/game/${post.gameId}`}>
            {gameData.filter((game) => game.id === post.gameId)[0].name}
          </GameTag>
        )}
        <Votes
          postId={post.id}
          itemId={post.id}
          updateItem={updatePost}
          upvotes={post.upvotes}
          downvotes={post.downvotes}
          userId={post.userId}
        />
        <PostCreatedTime>{`Posted at: ${format(
          new Date(post.created_at),
          "Pp"
        )}`}</PostCreatedTime>
      </PostDetails>
      {isAuthenticated && !parentPostId && (
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
            <DetailLink onClick={onDetail} to={`/social/post/${post.id}`}>
              Detail
            </DetailLink>
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
  parentPostId: PropTypes.number,
  id: PropTypes.string,
};

export default SocialFeedPost;
