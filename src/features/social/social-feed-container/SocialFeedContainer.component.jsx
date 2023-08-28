import { useParams } from "react-router-dom";

import SocialFeedPost from "../social-feed-post/SocialFeedPost.component";
import {
  SocialFeedButton,
  SocialFeedButtons,
  SocialFeedContent,
  StyledSocialFeedContainer,
} from "./SocialFeedContainer.styles";
import { useSearchParams } from "react-router-dom";
import { usePostByUser } from "../usePostByUser";
import { useHint } from "../../hint/hint-list/useHint";
import Spinner from "../../../ui/spinner/Spinner";
import HintItem from "../../hint/hint-item/HintItem.component";
import { useUser } from "../../auth/useUser";
import { useAllGames } from "../../account/account-profile-details-section/useAllGames";
import { useEffect, useState } from "react";
import { compareDesc } from "date-fns";
import { useReplyByPostId } from "../useReplyByPostId";
import { usePostById } from "../usePostById";

function SocialFeedContainer() {
  const { userId, postId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortedPosts, setSortedPosts] = useState([]);

  const { isAuthenticated, user } = useUser();

  const {
    gameData,
    isLoading: isGettingGames,
    isError: isGamesError,
  } = useAllGames();

  const { posts, isGettingPosts, isError: isPostError } = usePostByUser(userId);

  const {
    hintData,
    isLoading: isGettingHints,
    isFetching: isFetchingHints,
    isError: isHintError,
  } = useHint({
    by: "userId",
    id: userId,
  });

  const { post, isGettingPost, isError: isPostIdError } = usePostById(postId);

  const {
    replies,
    isGettingReplies,
    isError: isRepliesError,
  } = useReplyByPostId(post?.id);

  const isLoadingReplies =
    isGettingPost || isPostIdError || isGettingReplies || isRepliesError;
  const isLoadingHints = isGettingHints || isFetchingHints || isHintError;
  const isLoadingPosts = isGettingPosts || isPostError;
  const isLoadingGames = isGettingGames || isGamesError;

  function setView(view) {
    searchParams.set("view", view);
    setSearchParams(searchParams);
  }

  useEffect(
    function () {
      if (!posts && !replies) return;

      if (posts) {
        setSortedPosts([
          ...posts.sort((postA, postB) =>
            compareDesc(new Date(postA.created_at), new Date(postB.created_at))
          ),
        ]);
      } else {
        setSortedPosts([
          ...replies.sort((postA, postB) =>
            compareDesc(new Date(postA.created_at), new Date(postB.created_at))
          ),
        ]);
      }
    },
    [posts, replies]
  );

  useEffect(
    function () {
      if (
        !isAuthenticated &&
        (searchParams.get("view") === "following" ||
          searchParams.get("view") === "discover")
      ) {
        searchParams.set("view", "trending");
        setSearchParams(searchParams);
      }
    },
    [isAuthenticated, searchParams, setSearchParams]
  );

  return (
    <StyledSocialFeedContainer>
      {!postId && (
        <SocialFeedButtons>
          {userId ? (
            <>
              <SocialFeedButton onClick={() => setView("posts")}>
                Posts
              </SocialFeedButton>
              <SocialFeedButton onClick={() => setView("hints")}>
                Hints
              </SocialFeedButton>
            </>
          ) : isAuthenticated ? (
            <>
              <SocialFeedButton onClick={() => setView("trending")}>
                Trending
              </SocialFeedButton>
              <SocialFeedButton onClick={() => setView("following")}>
                Following
              </SocialFeedButton>
              <SocialFeedButton onClick={() => setView("discover")}>
                Discover
              </SocialFeedButton>
            </>
          ) : null}
        </SocialFeedButtons>
      )}
      <SocialFeedContent>
        {postId && isLoadingReplies ? (
          <Spinner />
        ) : postId && !isLoadingReplies ? (
          sortedPosts.map((post) => (
            <SocialFeedPost
              key={post.id}
              post={post}
              gameData={gameData}
              isReply={post.postId}
            />
          ))
        ) : searchParams.get("view") === "hints" ? (
          isLoadingHints || !hintData || !userId ? (
            <Spinner />
          ) : (
            hintData.map((hint) => (
              <HintItem
                hint={hint}
                id={`hint_${hint.id}`}
                user={user}
                isNewHint={false}
                key={hint.id}
              />
            ))
          )
        ) : isLoadingPosts ||
          !sortedPosts ||
          isLoadingGames ||
          !gameData ||
          !userId ? (
          <Spinner />
        ) : (
          sortedPosts
            .filter((post) => !post.postId)
            .map((post) => (
              <SocialFeedPost
                key={post.id}
                post={post}
                gameData={gameData}
                isReply={post.postId}
              />
            ))
        )}
      </SocialFeedContent>
    </StyledSocialFeedContainer>
  );
}

export default SocialFeedContainer;
