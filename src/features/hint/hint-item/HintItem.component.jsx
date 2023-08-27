import PropTypes from "prop-types";
import {
  Downvote,
  HintDeleteButton,
  HintDescription,
  HintTag,
  HintTagsContainer,
  HintUpvotes,
  StyledHintItem,
  Upvote,
} from "./HintItem.styles";

import { HiOutlineArrowUp, HiOutlineArrowDown, HiTrash } from "react-icons/hi";
import { useVote } from "./useVote";
import { useAddVote } from "./useAddVote";
import { useUpdateHintPopularity } from "./useUpdateHint";
import { useEditVote } from "./useEditVote";
import { useDeleteVote } from "./useDeleteVote";
import Modal from "../../../ui/modal/Modal.component";
import ConfirmationCheck from "../../../ui/confirmation-check/ConfirmationCheck.component";
import { ConfirmationText } from "../../../ui/confirmation-check/ConfirmationCheck.styles";
import { useDeleteHint } from "./useDeleteHint";
import AvatarNavLink from "../../../ui/avatar-nav-link/AvatarNavLink.component";

function HintItem({ hint, id, setCurrentHint, isNewHint, user }) {
  const { id: userId } = user || { id: null };

  const { isLoading, voteData } = useVote(hint.id);

  const {
    addVote,
    isLoading: isVoting,
    isError: isAddVoteError,
  } = useAddVote(hint.id);

  const {
    deleteHint,
    isLoading: isDeletingHint,
    isError: isDeleteHintError,
  } = useDeleteHint();

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

  function upvote() {
    if (isLoading || isVoting || !userId || userId === hint.userId) return;

    setCurrentHint?.(hint.id);

    !userVote
      ? addNewVote(true)
      : userVote.isPositive
      ? deleteExistingVote()
      : editExistingVote(true);
  }

  function downVote() {
    if (isLoading || isVoting || !userId || userId === hint.userId) return;

    setCurrentHint?.(hint.id);

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

  function deleteExistingHint() {
    deleteHint(hint.id);
  }

  return (
    <StyledHintItem id={id}>
      <AvatarNavLink userId={hint.userId} />
      <HintUpvotes>
        {user && user.id === hint.userId && (
          <Modal>
            <Modal.Open opens="confirmDelete">
              <HintDeleteButton>
                <HiTrash />
              </HintDeleteButton>
            </Modal.Open>
            <Modal.Window name="confirmDelete">
              <ConfirmationCheck
                onConfirm={deleteExistingHint}
                actionLoading={isDeletingHint}
                actionError={isDeleteHintError}
              >
                <ConfirmationText>
                  Are you sure you wish to delete your hint? This cannot be
                  undone!
                </ConfirmationText>
              </ConfirmationCheck>
            </Modal.Window>
          </Modal>
        )}
        <Upvote
          disabled={isNewHint}
          onClick={upvote}
          $canVote={userId !== hint.userId}
          $authorized={userId}
          $voted={userVote && userVote.isPositive}
        >
          <HiOutlineArrowUp />
        </Upvote>
        <p>{voteData ? getUpvotes(voteData) : "-"}</p>
        <Downvote
          disabled={isNewHint}
          onClick={downVote}
          $canVote={userId !== hint.userId}
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
  setCurrentHint: PropTypes.func,
  isNewHint: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

export default HintItem;
