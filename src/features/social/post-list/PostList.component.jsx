import PropTypes from "prop-types";

import SocialFeedPost from "../social-feed-post/SocialFeedPost.component";

import { BATCH_ITEM_MULTIPLIER } from "../../../data/consts";

import { refProps, useBatchLoading } from "../../../hooks/useBatchLoading";

function PostList({ posts, gameData }) {
  const { batchNumber, ref } = useBatchLoading();

  return (
    <>
      {posts
        ?.filter((post) => !post.postId)
        .slice(0, batchNumber * BATCH_ITEM_MULTIPLIER)
        .map((post, index) => {
          return (
            <SocialFeedPost
              key={`post_${post.id}`}
              id={`post_${post.id}`}
              post={post}
              gameData={gameData}
              parentPostId={post.postId}
              {...refProps(index, batchNumber, ref)}
            />
          );
        })}
    </>
  );
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  gameData: PropTypes.array.isRequired,
};

export default PostList;
