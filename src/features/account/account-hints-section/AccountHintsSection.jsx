import { useSearchParams } from "react-router-dom";

import { useHint } from "../../../query/hint/useHint";
import { useUser } from "../../../query/auth/useUser";
import { useHintsByVotes } from "../../../query/hint/useHintsByVotes";

import Spinner from "../../../ui/spinner/Spinner";
import HintItem from "../../hint/hint-item/HintItem.component";

import {
  AccountHintsList,
  StyledAccountHints,
} from "./AccountHintsSection.styles";

function AccountHintsSection() {
  const [searchParams] = useSearchParams();

  const { user } = useUser();

  const {
    isLoading: isLoadingHints,
    isFetching: isFetchingHints,
    hintData: userHints,
  } = useHint({
    by: "userId",
    id: user?.id,
  });

  const { hintData: votedHints } = useHintsByVotes({
    column: searchParams.get("type"),
    value: user ? [user.id] : null,
  });

  const isLoading = isLoadingHints || isFetchingHints;

  const sortedHints =
    searchParams.get("type") === "user"
      ? userHints?.sort(
          (hintA, hintB) =>
            hintB.upvotes.length -
            hintB.downvotes.length -
            (hintA.upvotes.length - hintA.downvotes.length)
        )
      : votedHints?.sort(
          (hintA, hintB) =>
            hintB.upvotes.length -
            hintB.downvotes.length -
            (hintA.upvotes.length - hintA.downvotes.length)
        );

  return (
    <StyledAccountHints>
      {isLoading || !sortedHints ? (
        <Spinner />
      ) : (
        <AccountHintsList>
          {sortedHints?.map((hint) => (
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
