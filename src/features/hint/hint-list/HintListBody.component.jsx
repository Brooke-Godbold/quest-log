import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { add, compareAsc, compareDesc } from "date-fns";

import { useHint } from "../../../query/hint/useHint";
import { useUser } from "../../../query/auth/useUser";
import { useProfilesByUsername } from "../../../query/profile/useProfilesByUsername";
import { usePostsByGames } from "../../../query/post/usePostByGame";
import { useAllGames } from "../../../query/game/useAllGames";

import Spinner from "../../../ui/spinner/Spinner";
import PostList from "../../social/post-list/PostList.component";
import Hints from "../hints/Hints.component";

import { HintList, HintListContainer, NoHints } from "./HintList.styles";

import { useScrollToItem } from "../../../hooks/useScrollToItem";

function HintListBody() {
  const { user } = useUser();

  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get("sort") || "popularity";
  const filterValue = searchParams.get("filter") || "none";
  const searchUsername = searchParams.get("username");

  const { id } = useParams();
  const {
    isLoading: isLoadingHints,
    isFetching: isFetchingHints,
    hintData,
  } = useHint({ by: "gameId", id });

  const {
    profile: profileData,
    isGettingProfile,
    isFetchingProfile,
  } = useProfilesByUsername(searchUsername);

  const { gameData, isLoading: isLoadingGames } = useAllGames();
  const { posts, isGettingPosts } = usePostsByGames([id]);

  const isLoading =
    isLoadingHints ||
    isFetchingHints ||
    isGettingProfile ||
    isFetchingProfile ||
    isGettingPosts ||
    isLoadingGames;

  const isNoResultsAvailable =
    (searchParams.get("view") === "posts" && posts?.length === 0) ||
    (searchParams.get("view") === "hints" && hintData?.length === 0);

  const [initialLoad, setInitialLoad] = useState(true);

  const [sortedFilteredData, setSortedFilteredData] = useState([]);

  useScrollToItem([hintData, posts]);

  useEffect(
    function () {
      if (!isFetchingHints) setInitialLoad(false);
    },
    [isFetchingHints]
  );

  useEffect(
    function () {
      if (!user && searchParams.get("filter") === "mine") {
        searchParams.set("filter", "none");
        setSearchParams(searchParams);
      }
    },
    [searchParams, setSearchParams, user]
  );

  useEffect(
    function () {
      const data = searchParams.get("view") === "posts" ? posts : hintData;

      if (!data) return;

      const currentData = [...data];
      const sortedData = sortHints(currentData, sortValue);
      const filteredData = filterHints(sortedData, filterValue, user);

      const usernameFiltered =
        searchParams.get("username") && profileData
          ? filterByUser(filteredData)
          : filteredData;

      const tagFiltered =
        searchParams.get("tag") && searchParams.get("view") === "hints"
          ? filterByTags(usernameFiltered)
          : usernameFiltered;

      setSortedFilteredData(tagFiltered);

      function filterByUser(hints) {
        return hints.filter((hint) => {
          return profileData.some((profile) => hint.userId === profile.userId);
        });
      }

      function filterByTags(hints) {
        return hints.filter((hint) =>
          hint.hintTypes?.includes(searchParams.get("tag"))
        );
      }
    },

    [hintData, posts, sortValue, filterValue, user, searchParams, profileData]
  );

  function sortHints(hintData, sortBy) {
    switch (sortBy) {
      case "popularity":
        return hintData.sort(
          (hintA, hintB) =>
            hintB.upvotes.length -
            hintB.downvotes.length -
            (hintA.upvotes.length - hintA.downvotes.length)
        );
      case "newest":
        return hintData.sort((hintA, hintB) =>
          compareDesc(new Date(hintA.created_at), new Date(hintB.created_at))
        );
      case "oldest":
        return hintData.sort((hintA, hintB) =>
          compareAsc(new Date(hintA.created_at), new Date(hintB.created_at))
        );
      default:
        console.error("Unknown Sort Type");
        return hintData;
    }
  }

  function filterHints(hintData, filterBy, user) {
    switch (filterBy) {
      case "none":
        return hintData;
      case "positive":
        return hintData.filter(
          (hint) => hint.upvotes.length - hint.downvotes.length >= 0
        );
      case "sixMonths":
        return hintData.filter(
          (hint) =>
            compareDesc(
              new Date(hint.created_at),
              add(new Date(), { months: 6 })
            ) >= 0
        );
      case "mine":
        if (user) {
          return hintData
            .filter((hint) => hint.userId === user.id)
            .sort((hintA, hintB) =>
              compareDesc(
                new Date(hintA.created_at),
                new Date(hintB.created_at)
              )
            );
        } else {
          return hintData;
        }
      default:
        console.error("Unknown Filter Type");
        return hintData;
    }
  }

  return (
    <HintListContainer>
      <HintList>
        {isLoading && initialLoad ? (
          <Spinner />
        ) : isNoResultsAvailable ? (
          <NoHints>Nothing here yet...</NoHints>
        ) : searchParams.get("view") === "posts" && gameData ? (
          <PostList posts={sortedFilteredData} gameData={gameData} />
        ) : (
          <Hints hints={sortedFilteredData} user={user} />
        )}
      </HintList>
    </HintListContainer>
  );
}

export default HintListBody;
