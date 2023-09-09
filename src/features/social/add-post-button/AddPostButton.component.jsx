import PropTypes from 'prop-types';

import { useUser } from '../../../query/auth/useUser';
import { useAllGames } from '../../../query/game/useAllGames';
import { useProfileByUser } from '../../../query/profile/useProfileByUser';

import Modal from '../../../ui/modal/Modal.component';
import AddPostForm from '../add-post-form/AddPostForm.component';

function AddPostButton({ styledPostButton, onOpenCallback, isActive = true }) {
  const { isAuthenticated, user } = useUser();
  const { profile } = useProfileByUser(user?.id);

  const { gameData } = useAllGames();

  return (
    <>
      {isAuthenticated && user && gameData && profile && isActive && (
        <Modal>
          <Modal.Open onOpenCallback={onOpenCallback} opens="addPost">
            {styledPostButton}
          </Modal.Open>
          <Modal.Window name="addPost">
            <AddPostForm
              gameData={gameData}
              currentGames={profile.currentGames}
              userId={user.id}
            />
          </Modal.Window>
        </Modal>
      )}
    </>
  );
}

AddPostButton.propTypes = {
  styledPostButton: PropTypes.node.isRequired,
  onOpenCallback: PropTypes.func,
  isActive: PropTypes.bool,
};

export default AddPostButton;
