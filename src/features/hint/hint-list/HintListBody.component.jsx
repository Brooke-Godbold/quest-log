import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import Spinner from "../../../ui/spinner/Spinner";
import HintItem from "../hint-item/HintItem.component";
import {
  HintList,
  HintListContainer,
  HintListOverlay,
  NoHints,
} from "./HintList.styles";

import { useHint } from "./useHint";
import { add, compareAsc, compareDesc } from "date-fns";
import { useUser } from "../../auth/useUser";

function HintListBody({ isNewHint }) {
  const { user } = useUser();

  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get("sort") || "popularity";
  const filterValue = searchParams.get("filter") || "none";

  const { id } = useParams();
  const { isLoading, isFetching, hintData } = useHint({ by: "gameId", id });

  const [initialLoad, setInitialLoad] = useState(true);

  const [sortedFilteredData, setSortedFilteredData] = useState([]);

  const currentHint = useRef(0);

  function setCurrentHint(current) {
    currentHint.current = current;
  }

  useEffect(
    function () {
      if (!isFetching) setInitialLoad(false);
    },
    [isFetching]
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
      if (!hintData || isNewHint) return;

      const currentData = [...hintData];
      const sortedData = sortHints(currentData, sortValue);
      const filteredData = filterHints(sortedData, filterValue, user);
      setSortedFilteredData(filteredData);

      const currentHintElement = document.getElementById(
        `hint_${currentHint.current}`
      );

      if (!currentHintElement) return;

      currentHintElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    },
    [hintData, isNewHint, sortValue, filterValue, user]
  );

  function sortHints(hintData, sortBy) {
    switch (sortBy) {
      case "popularity":
        return hintData.sort(
          (hintA, hintB) => hintB.popularity - hintA.popularity
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
        return hintData.filter((hint) => hint.popularity >= 0);
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
    <HintListContainer $scrollEnabled={!isNewHint}>
      <HintList>
        {isNewHint && <HintListOverlay />}
        {((isLoading || isFetching) && initialLoad) || !hintData ? (
          <Spinner />
        ) : hintData.length === 0 ? (
          !isNewHint ? (
            <NoHints>Nothing here yet...</NoHints>
          ) : null
        ) : (
          sortedFilteredData.map((hint) => (
            <HintItem
              hint={hint}
              key={hint.id}
              id={`hint_${hint.id}`}
              currentHint={currentHint}
              setCurrentHint={setCurrentHint}
              isNewHint={isNewHint}
              user={user}
            />
          ))
        )}
      </HintList>
    </HintListContainer>
  );
}

HintListBody.propTypes = {
  isNewHint: PropTypes.bool.isRequired,
};

export default HintListBody;
