import PropTypes from "prop-types";

import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import { HiTrash } from "react-icons/hi";

import { useDeleteHint } from "../../../query/hint/useDeleteHint";
import { useUpdateHint } from "../../../query/hint/useUpdateHint";
import { useAllGames } from "../../../query/game/useAllGames";

import Modal from "../../../ui/modal/Modal.component";
import ConfirmationCheck from "../../../ui/confirmation-check/ConfirmationCheck.component";
import AvatarNavLink from "../../../ui/avatar-nav-link/AvatarNavLink.component";
import Votes from "../../../ui/votes/Votes.component";
import GameTag from "../../../ui/game-tag/GameTag.component";
import Notification from "../../../ui/notification/Notification.component";

import {
  HintActionsContainer,
  HintDeleteButton,
  HintDescription,
  HintTag,
  HintTagsContainer,
  NavLinkContainer,
  StyledHintItem,
} from "./HintItem.styles";
import { ConfirmationText } from "../../../ui/confirmation-check/ConfirmationCheck.styles";

function HintItem({ hint, id, user }) {
  const { userId } = useParams();
  const { updateHint } = useUpdateHint();

  const { gameData } = useAllGames();

  const { deleteHint, isLoading: isDeletingHint } = useDeleteHint();

  function deleteExistingHint() {
    deleteHint(hint.id, {
      onSuccess: () =>
        toast(() => <Notification text="Successfully deleted hint!" />),
      onError: () =>
        toast.error(() => (
          <Notification text="Unable to delete hint at this time" />
        )),
    });
  }

  return (
    <StyledHintItem id={id}>
      <NavLinkContainer>
        <AvatarNavLink userId={hint.userId} view="hints" gameId={hint.gameId} />
      </NavLinkContainer>
      <HintActionsContainer>
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
              >
                <ConfirmationText>
                  Are you sure you wish to delete your hint? This cannot be
                  undone!
                </ConfirmationText>
              </ConfirmationCheck>
            </Modal.Window>
          </Modal>
        )}
        <Votes
          itemId={hint.id}
          updateItem={updateHint}
          upvotes={hint.upvotes}
          downvotes={hint.downvotes}
          userId={hint.userId}
        />
      </HintActionsContainer>
      <HintTagsContainer>
        {hint.hintTypes
          ? hint.hintTypes.map((type) => (
              <HintTag key={`hint_${hint.id}_${type}`}>{type}</HintTag>
            ))
          : null}
      </HintTagsContainer>
      <HintDescription>{hint.description}</HintDescription>
      {userId && gameData && (
        <GameTag to={`/game/${hint.gameId}`}>
          {gameData.filter((game) => game.id === hint.gameId)[0]?.name}
        </GameTag>
      )}
    </StyledHintItem>
  );
}

HintItem.propTypes = {
  hint: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  setCurrentHint: PropTypes.func,
  user: PropTypes.object,
};

export default HintItem;
