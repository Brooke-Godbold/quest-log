import PropTypes from 'prop-types';

import { useSearchParams } from 'react-router-dom';

import SocialFeedPost from '../social-feed-post/SocialFeedPost.component';
import FollowSuggestions from '../../../ui/follow-suggestions/FollowSuggestions.component';

import { refProps, useBatchLoading } from '../../../hooks/useBatchLoading';

import { BATCH_ITEM_MULTIPLIER } from '../../../data/consts';

function PostList({ posts, gameData }) {
  const { batchNumber, ref } = useBatchLoading();

  const [searchParams] = useSearchParams();

  return (
    <>
      {posts?.length === 0 && searchParams.get('view') === 'following' && (
        <FollowSuggestions />
      )}
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
