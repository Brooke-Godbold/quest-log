import PropTypes from "prop-types";

import { useParams, useSearchParams } from "react-router-dom";
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

function HintItem({ hint, id, user, innerRef }) {
  const { userId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { updateHint } = useUpdateHint(onVoteSuccess);

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

  function onVoteSuccess() {
    searchParams.set("hint", hint.id);
    setSearchParams(searchParams, { replace: true });
  }

  return (
    <StyledHintItem id={id} ref={innerRef}>
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
          searchParam="hint"
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
        <GameTag to={`/game/${hint.gameId}?view=hints`}>
          {gameData.filter((game) => game.id === hint.gameId)[0]?.name}
        </GameTag>
      )}
    </StyledHintItem>
  );
}

HintItem.propTypes = {
  hint: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  user: PropTypes.object,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default HintItem;
