import PropTypes from "prop-types";
import {
  Downvote,
  HintDescription,
  HintTag,
  HintTagsContainer,
  HintUpvotes,
  StyledHintItem,
  SubmittedByContainer,
  Upvote,
  UserAvatar,
  UserName,
} from "./HintItem.styles";

import { HiOutlineArrowUp, HiOutlineArrowDown } from "react-icons/hi";
import { useVote } from "./useVote";
import { useAddVote } from "./useAddVote";
import { useUpdateHintPopularity } from "./useUpdateHint";

function HintItem({ hint, id, setCurrentHint, isNewHint }) {
  const { isLoading, voteData } = useVote(hint.id);
  const {
    addVote,
    isLoading: isVoting,
    isError: isAddVoteError,
  } = useAddVote(hint.id);
  const { updateHintPopularity } = useUpdateHintPopularity();

  function getUpvotes(voteData) {
    return voteData.reduce((acc, vote) => (vote.isPositive ? acc + 1 : acc), 0);
  }

  function getDownvotes(voteData) {
    return voteData.reduce(
      (acc, vote) => (!vote.isPositive ? acc + 1 : acc),
      0
    );
  }

  function upvote() {
    if (isLoading || isVoting) return;

    setCurrentHint(hint.id);
    addVote({
      hintId: hint.id,
      isPositive: true,
    });

    if (isAddVoteError) return;

    updateHintPopularity({
      hintId: hint.id,
      popularity: hint.popularity + 1,
    });
  }

  function downVote() {
    if (isLoading || isVoting) return;

    setCurrentHint(hint.id);
    addVote({
      hintId: hint.id,
      isPositive: false,
    });

    if (isAddVoteError) return;

    updateHintPopularity({
      hintId: hint.id,
      popularity: hint.popularity - 1,
    });
  }

  return (
    <StyledHintItem id={id}>
      <SubmittedByContainer>
        <UserAvatar src="https://xhkwznfhytvgvorvkcdp.supabase.co/storage/v1/object/public/avatars/andy.jpg" />
        <UserName>Ronald Drumpf</UserName>
      </SubmittedByContainer>
      <HintUpvotes>
        <Upvote disabled={isNewHint} onClick={upvote}>
          <HiOutlineArrowUp />
        </Upvote>
        <p>{voteData ? getUpvotes(voteData) : "-"}</p>
        <Downvote disabled={isNewHint} onClick={downVote}>
          <HiOutlineArrowDown />
        </Downvote>
        <p>{voteData ? getDownvotes(voteData) : "-"}</p>
      </HintUpvotes>
      <HintTagsContainer>
        {hint.hintTypes
          ? hint.hintTypes.map((type) => (
              <HintTag key={`hint_${hint.id}_${type}`}>{type}</HintTag>
            ))
          : null}
      </HintTagsContainer>
      <HintDescription>{hint.description}</HintDescription>
    </StyledHintItem>
  );
}

HintItem.propTypes = {
  hint: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  setCurrentHint: PropTypes.func.isRequired,
  isNewHint: PropTypes.bool.isRequired,
};

export default HintItem;
