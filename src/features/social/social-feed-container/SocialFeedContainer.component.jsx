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

function SocialFeedContainer() {
  const { userId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortedPosts, setSortedPosts] = useState([]);

  const { user } = useUser();

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

  const isLoadingHints = isGettingHints || isFetchingHints || isHintError;
  const isLoadingPosts = isGettingPosts || isPostError;
  const isLoadingGames = isGettingGames || isGamesError;

  function setView(view) {
    searchParams.set("view", view);
    setSearchParams(searchParams);
  }

  useEffect(
    function () {
      if (!posts) return;

      setSortedPosts([
        ...posts.sort((postA, postB) =>
          compareDesc(new Date(postA.created_at), new Date(postB.created_at))
        ),
      ]);
    },
    [posts]
  );

  return (
    <StyledSocialFeedContainer>
      <SocialFeedButtons>
        <SocialFeedButton onClick={() => setView("posts")}>
          Posts
        </SocialFeedButton>
        <SocialFeedButton onClick={() => setView("hints")}>
          Hints
        </SocialFeedButton>
      </SocialFeedButtons>
      <SocialFeedContent>
        {searchParams.get("view") === "hints" ? (
          isLoadingHints || !hintData ? (
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
        ) : isLoadingPosts || !sortedPosts || isLoadingGames || !gameData ? (
          <Spinner />
        ) : (
          sortedPosts.map((post) => (
            <SocialFeedPost key={post.id} post={post} gameData={gameData} />
          ))
        )}
      </SocialFeedContent>
    </StyledSocialFeedContainer>
  );
}

export default SocialFeedContainer;
