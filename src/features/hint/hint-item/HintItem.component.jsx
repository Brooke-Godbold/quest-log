import PropTypes from "prop-types";
import {
  HintActionsContainer,
  HintDeleteButton,
  HintDescription,
  HintTag,
  HintTagsContainer,
  NavLinkContainer,
  StyledHintItem,
} from "./HintItem.styles";

import { HiTrash } from "react-icons/hi";
import Modal from "../../../ui/modal/Modal.component";
import ConfirmationCheck from "../../../ui/confirmation-check/ConfirmationCheck.component";
import { ConfirmationText } from "../../../ui/confirmation-check/ConfirmationCheck.styles";
import { useDeleteHint } from "./useDeleteHint";
import AvatarNavLink from "../../../ui/avatar-nav-link/AvatarNavLink.component";
import Votes from "../../../ui/votes/Votes.component";
import { useUpdateHint } from "./useUpdateHint";
import GameTag from "../../../ui/game-tag/GameTag.component";
import { useParams } from "react-router-dom";
import { useAllGames } from "../../account/account-profile-details-section/useAllGames";

function HintItem({ hint, id, user }) {
  const { userId } = useParams();
  const { updateHint } = useUpdateHint();

  const { gameData } = useAllGames();

  const {
    deleteHint,
    isLoading: isDeletingHint,
    isError: isDeleteHintError,
  } = useDeleteHint();

  function deleteExistingHint() {
    deleteHint(hint.id);
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
  isNewHint: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

export default HintItem;
