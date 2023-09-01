import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { add, compareAsc, compareDesc } from "date-fns";

import { useHint } from "../../../query/hint/useHint";
import { useUser } from "../../../query/auth/useUser";
import { useProfilesByUsername } from "../../../query/profile/useProfilesByUsername";

import Spinner from "../../../ui/spinner/Spinner";
import HintItem from "../hint-item/HintItem.component";

import { HintList, HintListContainer, NoHints } from "./HintList.styles";

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

  const isLoading =
    isLoadingHints || isFetchingHints || isGettingProfile || isFetchingProfile;

  const [initialLoad, setInitialLoad] = useState(true);

  const [sortedFilteredData, setSortedFilteredData] = useState([]);

  const currentHint = useRef(0);

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
    [searchParams, setSearchParams, user, profileData, hintData]
  );

  useEffect(
    function () {
      if (!hintData) return;

      const currentData = [...hintData];
      const sortedData = sortHints(currentData, sortValue);
      const filteredData = filterHints(sortedData, filterValue, user);

      const usernameFiltered =
        searchParams.get("username") && profileData
          ? filterByUser(filteredData)
          : filteredData;

      const tagFiltered = searchParams.get("tag")
        ? filterByTags(usernameFiltered)
        : usernameFiltered;

      setSortedFilteredData(tagFiltered);

      const currentHintElement = document.getElementById(
        `hint_${currentHint.current}`
      );

      if (!currentHintElement) return;

      currentHintElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });

      function filterByUser(hints) {
        return hints.filter((hint) => {
          return profileData.some((profile) => hint.userId === profile.userId);
        });
      }

      function filterByTags(hints) {
        return hints.filter((hint) =>
          hint.hintTypes.includes(searchParams.get("tag"))
        );
      }
    },

    [hintData, sortValue, filterValue, user, searchParams, profileData]
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
        {(isLoading && initialLoad) || !hintData ? (
          <Spinner />
        ) : hintData.length === 0 ? (
          <NoHints>Nothing here yet...</NoHints>
        ) : (
          sortedFilteredData.map((hint) => (
            <HintItem
              hint={hint}
              key={hint.id}
              id={`hint_${hint.id}`}
              currentHint={currentHint}
              user={user}
            />
          ))
        )}
      </HintList>
    </HintListContainer>
  );
}

export default HintListBody;
