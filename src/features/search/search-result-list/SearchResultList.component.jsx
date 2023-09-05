import PropTypes from "prop-types";

import SocialFeedPost from "../../social/social-feed-post/SocialFeedPost.component";
import SearchResultItem from "../search-result-item/SearchResultItem.component";

import { refProps, useBatchLoading } from "../../../hooks/useBatchLoading";

import { BATCH_ITEM_MULTIPLIER } from "../../../data/consts";

function SearchResultList({ searchResultObject, gameData }) {
  const { batchNumber, ref } = useBatchLoading();

  const searchResults = [
    ...(searchResultObject.gameResults || []),
    ...(searchResultObject.profileResults || []),
    ...(searchResultObject.postResults || []),
  ];

  return (
    <>
      {searchResults
        .slice(0, batchNumber * BATCH_ITEM_MULTIPLIER)
        .map((result, index) => {
          if (result.name) {
            return (
              <SearchResultItem
                key={`game_${result.id}`}
                gameData={result}
                description={result.description}
                {...refProps(index, batchNumber, ref)}
              />
            );
          }

          if (result.username) {
            return (
              <SearchResultItem
                key={`profile_${result.userId}`}
                userId={result.userId}
                description={result.bio}
                {...refProps(index, batchNumber, ref)}
              />
            );
          }

          if (result.upvotes) {
            return (
              <SocialFeedPost
                id={`post_${result.id}`}
                key={`post_${result.id}`}
                post={result}
                gameData={gameData}
                parentPostId={result.postId}
                {...refProps(index, batchNumber, ref)}
              />
            );
          }
        })}
    </>
  );
}

SearchResultList.propTypes = {
  searchResultObject: PropTypes.object.isRequired,
  gameData: PropTypes.array,
};

export default SearchResultList;
