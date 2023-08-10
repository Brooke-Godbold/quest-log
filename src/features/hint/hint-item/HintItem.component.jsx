import PropTypes from "prop-types";
import {
  Downvote,
  HintDescription,
  HintUpvotes,
  StyledHintItem,
  Upvote,
} from "./HintItem.styles";

import { HiOutlineArrowUp, HiOutlineArrowDown } from "react-icons/hi";
import { useVote } from "./useVote";
import { useAddVote } from "./useAddVote";

function HintItem({ hint, setIsSorting }) {
  const { isLoading, voteData } = useVote(hint.id);
  const { addVote, isLoading: isVoting } = useAddVote(hint.id);

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
    addVote({
      hintId: hint.id,
      isPositive: true,
    });

    setIsSorting(true);
  }

  function downVote() {
    addVote({
      hintId: hint.id,
      isPositive: false,
    });

    setIsSorting(true);
  }

  return (
    <StyledHintItem>
      <div>Submitted By</div>
      <HintUpvotes>
        <Upvote disabled={isLoading || isVoting} onClick={upvote}>
          <HiOutlineArrowUp />
        </Upvote>
        <p>{voteData ? getUpvotes(voteData) : "-"}</p>
        <Downvote disabled={isLoading || isVoting} onClick={downVote}>
          <HiOutlineArrowDown />
        </Downvote>
        <p>{voteData ? getDownvotes(voteData) : "-"}</p>
      </HintUpvotes>
      <HintDescription>{hint.description}</HintDescription>
    </StyledHintItem>
  );
}

HintItem.propTypes = {
  hint: PropTypes.object.isRequired,
  setIsSorting: PropTypes.func.isRequired,
};

export default HintItem;
