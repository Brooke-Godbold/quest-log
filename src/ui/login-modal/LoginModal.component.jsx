import PropTypes from "prop-types";

import Modal from "../modal/Modal.component";
import LoginContainer from "../../features/auth/login-container/LoginContainer.component";

function LoginModal({ loginButton, onOpenCallback }) {
  return (
    <Modal>
      <Modal.Open opens="login" onOpenCallback={onOpenCallback}>
        {loginButton}
      </Modal.Open>
      <Modal.Window name="login">
        <LoginContainer />
      </Modal.Window>
    </Modal>
  );
}

LoginModal.propTypes = {
  loginButton: PropTypes.node.isRequired,
  onOpenCallback: PropTypes.func,
};

export default LoginModal;
