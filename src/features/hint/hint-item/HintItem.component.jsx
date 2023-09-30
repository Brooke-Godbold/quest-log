import PropTypes from 'prop-types';

import { useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';

import { HiTrash } from 'react-icons/hi';
import { RiMegaphoneFill } from 'react-icons/ri';

import { useDeleteHint } from '../../../query/hint/useDeleteHint';
import { useUpdateHint } from '../../../query/hint/useUpdateHint';
import { useAllGames } from '../../../query/game/useAllGames';
import { useUser } from '../../../query/auth/useUser';

import Modal from '../../../ui/modal/Modal.component';
import ConfirmationCheck from '../../../ui/confirmation-check/ConfirmationCheck.component';
import AvatarNavLink from '../../../ui/avatar-nav-link/AvatarNavLink.component';
import Votes from '../../../ui/votes/Votes.component';
import GameTag from '../../../ui/game-tag/GameTag.component';
import Notification from '../../../ui/notification/Notification.component';
import ReportForm from '../../moderation/ReportForm.component';

import {
  HintActionsContainer,
  HintCreatedTime,
  HintDeleteButton,
  HintDescription,
  HintTag,
  HintTagsContainer,
  NavLinkContainer,
  StyledHintItem,
} from './HintItem.styles';
import { ConfirmationText } from '../../../ui/confirmation-check/ConfirmationCheck.styles';
import { ActionButton } from '../../social/user-header/UserHeader.styles';

import { usePersonalization } from '../../../contexts/PersonalizationContext';

function HintItem({ hint, id, innerRef }) {
  const { isAuthenticated, user } = useUser();

  const { id: gameId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { isPersonalizable, personalization } = usePersonalization();

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
    searchParams.set('hint', hint.id);
    setSearchParams(searchParams, { replace: true });
  }

  return (
    <StyledHintItem
      $isPersonalizable={isPersonalizable}
      $mainColor={personalization?.mainColor}
      id={id}
      ref={innerRef}
    >
      <NavLinkContainer>
        <AvatarNavLink userId={hint.userId} view="hints" gameId={hint.gameId} />
      </NavLinkContainer>
      <HintActionsContainer>
        {user?.id !== hint.userId && (
          <Modal>
            <Modal.Open opens="report">
              <ActionButton $active={true} $interactable={true}>
                <RiMegaphoneFill />
              </ActionButton>
            </Modal.Open>
            <Modal.Window name="report">
              <ReportForm reportedHint={hint} />
            </Modal.Window>
          </Modal>
        )}

        {isAuthenticated && user.id === hint.userId && (
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
              <HintTag
                key={`hint_${hint.id}_${type}`}
                $isPersonalizable={isPersonalizable}
                $tertiaryColor={personalization?.tertiaryColor}
                $secondaryColor={personalization?.secondaryColor}
              >
                {type}
              </HintTag>
            ))
          : null}
      </HintTagsContainer>
      <HintDescription
        $isPersonalizable={isPersonalizable}
        $tertiaryColor={personalization?.tertiaryColor}
      >
        {hint.description}
      </HintDescription>
      {!gameId && gameData && (
        <GameTag to={`/game/${hint.gameId}?view=hints`}>
          {gameData.filter((game) => game.id === hint.gameId)[0]?.name}
        </GameTag>
      )}
      <HintCreatedTime
        $isPersonalizable={isPersonalizable}
        $tertiaryColor={personalization?.tertiaryColor}
      >{`Posted at: ${format(
        new Date(hint.created_at),
        'Pp'
      )}`}</HintCreatedTime>
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
