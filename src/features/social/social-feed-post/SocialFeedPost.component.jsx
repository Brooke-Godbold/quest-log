import PropTypes from "prop-types";

import { useNavigate, useSearchParams } from "react-router-dom";
import { format } from "date-fns";

import { BsReplyFill } from "react-icons/bs";
import { TbMessage2Search } from "react-icons/tb";
import { IoArrowBackOutline } from "react-icons/io5";
import { AiFillFire } from "react-icons/ai";

import { useLocations } from "../../../contexts/LocationsContext";

import { useUser } from "../../../query/auth/useUser";
import { useReplyByPostId } from "../../../query/post/useReplyByPostId";
import { useUpdatePost } from "../../../query/post/useUpdatePost";
import { useProfileByUser } from "../../../query/profile/useProfileByUser";

import AvatarNavLink from "../../../ui/avatar-nav-link/AvatarNavLink.component";
import Modal from "../../../ui/modal/Modal.component";
import AddPostForm from "../add-post-form/AddPostForm.component";
import Votes from "../../../ui/votes/Votes.component";
import GameTag from "../../../ui/game-tag/GameTag.component";

import {
  DetailLink,
  PostButtonsContainer,
  PostContent,
  PostCreatedTime,
  PostDetails,
  QuoteBlock,
  RepliesCount,
  ReplyButton,
  StyledSocialFeedPost,
} from "./SocialFeedPost.styles";
import { ResponsiveButtonContent } from "../../../ui/responsive-button-content/ResponsiveButtonContent.styles";
import ZoomableImage from "../../../ui/zoomable-image/ZoomableImage.component";

function SocialFeedPost({
  post,
  quotedPost,
  id,
  gameData,
  isDetail = false,
  innerRef,
}) {
  const { isAuthenticated, user } = useUser();

  const navigate = useNavigate();
  const { previousLocation, setPreviousLocation } = useLocations();

  const [searchParams, setSearchParams] = useSearchParams();

  const { replies } = useReplyByPostId(post.id);

  const { updatePost } = useUpdatePost(onVoteSuccess);

  const { profile: quotedUser } = useProfileByUser(quotedPost?.userId);

  function handleClickQuote() {
    searchParams.set("post", post.quoteId);
    setSearchParams(searchParams);
  }

  function onVoteSuccess() {
    searchParams.set("post", post.id);
    setSearchParams(searchParams);
  }

  return (
    <StyledSocialFeedPost id={id} ref={innerRef}>
      <AvatarNavLink userId={post.userId} />
      {quotedPost && (
        <QuoteBlock onClick={handleClickQuote}>
          <h3>{quotedUser?.displayName}</h3>
          <p>{`" ${quotedPost.description} "`}</p>
        </QuoteBlock>
      )}
      <PostContent>{post.description}</PostContent>
      {post.imageUrl && <ZoomableImage imageUrl={post.imageUrl} />}
      <PostDetails>
        {post.gameId && gameData && (
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
          searchParam="post"
        />
        <PostCreatedTime>{`Posted at: ${format(
          new Date(post.created_at),
          "Pp"
        )}`}</PostCreatedTime>
      </PostDetails>
      <PostButtonsContainer>
        {replies && replies.length > 20 && <AiFillFire />}
        {replies && replies.length > 0 && (
          <RepliesCount>{`${replies.length} replies!`}</RepliesCount>
        )}
        {isAuthenticated && (
          <>
            <Modal>
              <Modal.Open opens="reply">
                <ReplyButton>
                  <ResponsiveButtonContent>
                    <p>Reply</p>
                    <BsReplyFill />
                  </ResponsiveButtonContent>
                </ReplyButton>
              </Modal.Open>
              <Modal.Window name="reply">
                <AddPostForm
                  userId={user.id}
                  parentPostId={(!post.postId && post.id) || post.postId}
                  quoteId={(post.postId && post.id) || null}
                />
              </Modal.Window>
            </Modal>
          </>
        )}
        {isDetail ? (
          <ReplyButton
            onClick={() =>
              navigate(
                previousLocation
                  ? `${previousLocation}&post=${post.id}`
                  : `/social/${post?.userId}?view=posts&post=${post.id}`,
                {
                  replace: true,
                }
              )
            }
          >
            <ResponsiveButtonContent>
              <p>Back</p>
              <IoArrowBackOutline />
            </ResponsiveButtonContent>
          </ReplyButton>
        ) : (
          !post.postId && (
            <DetailLink
              onClick={() => setPreviousLocation()}
              to={`/social/post/${post.id}?view=recent`}
            >
              <ResponsiveButtonContent>
                <p>View</p>
                <TbMessage2Search />
              </ResponsiveButtonContent>
            </DetailLink>
          )
        )}
      </PostButtonsContainer>
    </StyledSocialFeedPost>
  );
}

SocialFeedPost.propTypes = {
  post: PropTypes.object.isRequired,
  quotedPost: PropTypes.object,
  gameData: PropTypes.array,
  isDetail: PropTypes.bool,
  id: PropTypes.string,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default SocialFeedPost;
