import HintItem from "../../hint/hint-item/HintItem.component";
import {
  AccountHintsList,
  StyledAccountHints,
} from "./AccountHintsSection.styles";
import { useEffect, useState } from "react";
import { useHint } from "../../hint/hint-list/useHint";
import { useVotesByUser } from "../account-layout/useVotesByUser";
import { useHintByHintIds } from "../account-layout/useHintByHintIds";
import Spinner from "../../../ui/spinner/Spinner";
import { useUser } from "../../auth/useUser";
import { useSearchParams } from "react-router-dom";

function AccountHintsSection() {
  const [hintIds, setHintIds] = useState([]);

  const [searchParams] = useSearchParams();

  const { user } = useUser();

  const {
    isLoading: isLoadingHints,
    isFetching: isFetchingHints,
    hintData: userHints,
  } = useHint({
    by: "userId",
    id: user ? user.id : null,
  });

  const { isLoading: isLoadingVotes, voteData: userVotes } = useVotesByUser(
    user ? user.id : null
  );

  const {
    isLoading: isLoadingVotedHints,
    isFetching: isFetchingVotedHints,
    hintData: votedHints,
  } = useHintByHintIds(hintIds);

  const isLoading =
    isLoadingHints ||
    isFetchingHints ||
    isLoadingVotes ||
    isLoadingVotedHints ||
    isFetchingVotedHints;

  useEffect(
    function () {
      if (!userVotes) return;

      let hintIds = [];

      switch (searchParams.get("type")) {
        case "upvotes":
          hintIds = userVotes
            .filter((vote) => vote.isPositive)
            .map((vote) => vote.hintId);
          setHintIds(hintIds);
          break;
        case "downvotes":
          hintIds = userVotes
            .filter((vote) => !vote.isPositive)
            .map((vote) => vote.hintId);
          setHintIds(hintIds);
          break;
        default:
          setHintIds([]);
      }
    },
    [searchParams, userVotes]
  );

  const sortedHints =
    searchParams.get("type") === "user"
      ? userHints?.sort((hintA, hintB) => hintB.popularity - hintA.popularity)
      : votedHints?.sort((hintA, hintB) => hintB.popularity - hintA.popularity);

  //console.log("USER HINTS: ", userHints);
  //console.log("USER VOTES: ", userVotes);
  //console.log("USER PROFILE: ", profile);
  //console.log("VOTED HINTS", votedHints);

  return (
    <StyledAccountHints>
      {isLoading || !sortedHints ? (
        <Spinner />
      ) : (
        <AccountHintsList>
          {sortedHints.map((hint) => (
            <HintItem
              hint={hint}
              id={`hint_${hint.id}`}
              user={user}
              isNewHint={false}
              key={hint.id}
            />
          ))}
        </AccountHintsList>
      )}
    </StyledAccountHints>
  );
}

export default AccountHintsSection;
