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
import { useAllPosts } from "../useAllPosts";
import { useProfileByUser } from "../../account/account-layout/useProfileByUser";
import { GameSelect } from "../../../ui/game-select/GameSelect.styles";

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

  const {
    posts: userPosts,
    isGettingPosts,
    isError: isPostError,
  } = usePostByUser(userId);

  const { posts: allPosts } = useAllPosts();

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

  const { profile } = useProfileByUser(user?.id);

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
      if (!allPosts && !userPosts && !replies) return;

      setSortedPosts([]);

      switch (searchParams.get("view")) {
        case "trending":
          if (!allPosts) break;
          setSortedPosts([
            ...allPosts.sort(
              (postA, postB) =>
                postB.upvotes.length -
                postB.downvotes.length -
                (postA.upvotes.length - postA.downvotes.length)
            ),
          ]);
          break;

        case "following":
          if (!profile || !allPosts) break;
          setSortedPosts([
            ...allPosts
              .filter((post) => profile.following.includes(post.userId))
              .sort((postA, postB) =>
                compareDesc(
                  new Date(postA.created_at),
                  new Date(postB.created_at)
                )
              ),
          ]);
          break;

        case "discover":
          if (!profile || !allPosts) break;
          setSortedPosts([
            ...allPosts
              .filter(
                (post) =>
                  profile.currentGames.includes(post.gameId) &&
                  !profile.following.includes(post.userId) &&
                  post.userId !== user?.id
              )
              .sort((postA, postB) =>
                compareDesc(
                  new Date(postA.created_at),
                  new Date(postB.created_at)
                )
              ),
          ]);
          break;

        case "posts":
          if (!userPosts) break;
          setSortedPosts([
            ...userPosts
              .sort((postA, postB) =>
                compareDesc(
                  new Date(postA.created_at),
                  new Date(postB.created_at)
                )
              )
              .filter((post) =>
                searchParams.get("game")
                  ? post.gameId === Number(searchParams.get("game"))
                  : post
              ),
          ]);
          break;

        case "hints":
          if (!hintData) break;
          setSortedPosts([
            ...hintData.filter((hint) =>
              searchParams.get("game")
                ? hint.gameId === Number(searchParams.get("game"))
                : hint
            ),
          ]);
          break;

        default:
          if (!replies) break;
          setSortedPosts([
            ...replies.sort((postA, postB) =>
              compareDesc(
                new Date(postA.created_at),
                new Date(postB.created_at)
              )
            ),
          ]);
      }
    },
    [allPosts, searchParams, profile, userPosts, replies, hintData, user]
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

  useEffect(
    function () {
      setTimeout(() => {
        if (!searchParams.get("post")) return;

        const currentPost = document.getElementById(
          `post_${searchParams.get("post")}`
        );

        if (!currentPost) return;

        currentPost.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }, 150);
    },
    [searchParams]
  );

  function setGameFilter(e) {
    e.target.value >= 0
      ? searchParams.set("game", e.target.value)
      : searchParams.delete("game");
    setSearchParams(searchParams);
  }

  return (
    <StyledSocialFeedContainer>
      {!postId && (
        <SocialFeedButtons>
          {userId ? (
            <>
              <SocialFeedButton onClick={() => setView("posts")}>
                Posts
              </SocialFeedButton>
              <GameSelect
                value={searchParams.get("game") || -1}
                onChange={setGameFilter}
              >
                <option key={"none"} value={-1}>
                  None
                </option>
                {gameData?.map((game) => (
                  <option key={game.id} value={game.id}>
                    {game.name}
                  </option>
                ))}
              </GameSelect>
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
              id={`post_${post.id}`}
              key={post.id}
              post={post}
              gameData={gameData}
              parentPostId={post.postId}
            />
          ))
        ) : searchParams.get("view") === "hints" ? (
          isLoadingHints || !hintData || !userId ? (
            <Spinner />
          ) : (
            sortedPosts.map((hint) => (
              <HintItem
                hint={hint}
                id={`hint_${hint.id}`}
                user={user}
                isNewHint={false}
                key={hint.id}
              />
            ))
          )
        ) : !isLoadingPosts && sortedPosts && !isLoadingGames && gameData ? (
          sortedPosts
            .filter((post) => !post.postId)
            .map((post) => (
              <SocialFeedPost
                key={post.id}
                id={`post_${post.id}`}
                post={post}
                gameData={gameData}
                parentPostId={post.postId}
              />
            ))
        ) : (
          <Spinner />
        )}
      </SocialFeedContent>
    </StyledSocialFeedContainer>
  );
}

export default SocialFeedContainer;
