import PropTypes from "prop-types";

import SocialFeedPost from "../social-feed-post/SocialFeedPost.component";

import { refProps, useBatchLoading } from "../../../hooks/useBatchLoading";
import { BATCH_ITEM_MULTIPLIER } from "../../../data/consts";

function ReplyList({ replies, gameData }) {
  const { batchNumber, ref } = useBatchLoading();

  return (
    <>
      {replies
        .slice(0, batchNumber * BATCH_ITEM_MULTIPLIER)
        .map((post, index) => {
          return (
            <SocialFeedPost
              id={`post_${post.id}`}
              key={`post_${post.id}`}
              post={post}
              gameData={gameData}
              parentPostId={post.postId}
              quotedPost={
                post.quoteId &&
                replies.filter((reply) => reply.id === post.quoteId)[0]
              }
              {...refProps(index, batchNumber, ref)}
            />
          );
        })}
    </>
  );
}

ReplyList.propTypes = {
  replies: PropTypes.array.isRequired,
  gameData: PropTypes.array.isRequired,
};

export default ReplyList;
