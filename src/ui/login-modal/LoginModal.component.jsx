import PropTypes from "prop-types";
import Modal from "../modal/Modal.component";
import LoginContainer from "../../features/auth/login-container/LoginContainer.component";

function LoginModal({ loginButton }) {
  return (
    <Modal>
      <Modal.Open opens="login">{loginButton}</Modal.Open>
      <Modal.Window name="login">
        <LoginContainer />
      </Modal.Window>
    </Modal>
  );
}

LoginModal.propTypes = {
  loginButton: PropTypes.node.isRequired,
};

export default LoginModal;
