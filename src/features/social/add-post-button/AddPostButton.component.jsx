import { useParams } from "react-router-dom";
import { useUser } from "../../../query/auth/useUser";
import { useAllGames } from "../../../query/game/useAllGames";
import { useProfileByUser } from "../../../query/profile/useProfileByUser";

import Modal from "../../../ui/modal/Modal.component";
import AddPostForm from "../add-post-form/AddPostForm.component";

import { AddNewPostButton } from "../user-header/UserHeader.styles";

function AddPostButton() {
  const { userId } = useParams();

  const { isAuthenticated, user } = useUser();
  const { profile } = useProfileByUser(user?.id);

  const { gameData } = useAllGames();

  return (
    <>
      {isAuthenticated &&
        user &&
        gameData &&
        profile &&
        (!userId || userId === user.id) && (
          <Modal>
            <Modal.Open opens="addPost">
              <AddNewPostButton>Add New Post</AddNewPostButton>
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

export default AddPostButton;
