import { useUser } from '../../../query/auth/useUser';
import { useProfileByUser } from '../../../query/profile/useProfileByUser';
import Modal from '../../../ui/modal/Modal.component';
import NewUserFlowForm from './NewUserFlowForm.component';

function NewUserFlow() {
  const { user } = useUser();
  const { profile } = useProfileByUser(user?.id);

  if (!profile || !profile.newUser) return;

  return (
    <Modal>
      <Modal.AutoOpen opens="newUser" />
      <Modal.Window name="newUser" closeButton={false}>
        <NewUserFlowForm />
      </Modal.Window>
    </Modal>
  );
}

export default NewUserFlow;
