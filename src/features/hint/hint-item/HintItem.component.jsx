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
import { useEditVote } from "./useEditVote";
import { useDeleteVote } from "./useDeleteVote";

function HintItem({ hint, id, setCurrentHint, isNewHint, user }) {
  const { id: userId } = user || { id: null };

  const { isLoading, voteData } = useVote(hint.id);

  const {
    addVote,
    isLoading: isVoting,
    isError: isAddVoteError,
  } = useAddVote(hint.id);

  const { editVote, isError: isEditVoteError } = useEditVote(hint.id);

  const { deleteVote, isError: isDeleteVoteError } = useDeleteVote(hint.id);

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

  const userVote = voteData?.filter((vote) => vote.userId === userId)[0];
  //console.log(userVote);

  function upvote() {
    if (isLoading || isVoting || !userId) return;

    setCurrentHint(hint.id);

    !userVote
      ? addNewVote(true)
      : userVote.isPositive
      ? deleteExistingVote()
      : editExistingVote(true);
  }

  function downVote() {
    if (isLoading || isVoting || !userId) return;

    setCurrentHint(hint.id);

    !userVote
      ? addNewVote(false)
      : !userVote.isPositive
      ? deleteExistingVote()
      : editExistingVote(false);
  }

  function addNewVote(isPositive) {
    addVote({
      hintId: hint.id,
      isPositive,
      userId,
    });

    if (isAddVoteError) return;

    updateHintPopularity({
      hintId: hint.id,
      popularity: isPositive ? hint.popularity + 1 : hint.popularity - 1,
    });
  }

  function editExistingVote(isPositive) {
    editVote({ isPositive, voteId: userVote.id });

    if (isEditVoteError) return;

    updateHintPopularity({
      hintId: hint.id,
      popularity: isPositive ? hint.popularity + 2 : hint.popularity - 2,
    });
  }

  function deleteExistingVote() {
    deleteVote(userVote.id);

    if (isDeleteVoteError) return;

    updateHintPopularity({
      hintId: hint.id,
      popularity: userVote.isPositive
        ? hint.popularity - 1
        : hint.popularity + 1,
    });
  }

  return (
    <StyledHintItem id={id}>
      <SubmittedByContainer>
        <UserAvatar src="https://xhkwznfhytvgvorvkcdp.supabase.co/storage/v1/object/public/avatars/andy.jpg" />
        <UserName>Ronald McDonald</UserName>
      </SubmittedByContainer>
      <HintUpvotes>
        <Upvote
          disabled={isNewHint}
          onClick={upvote}
          $authorized={userId}
          $voted={userVote && userVote.isPositive}
        >
          <HiOutlineArrowUp />
        </Upvote>
        <p>{voteData ? getUpvotes(voteData) : "-"}</p>
        <Downvote
          disabled={isNewHint}
          onClick={downVote}
          $authorized={userId}
          $voted={userVote && !userVote.isPositive}
        >
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
  user: PropTypes.object,
};

export default HintItem;
