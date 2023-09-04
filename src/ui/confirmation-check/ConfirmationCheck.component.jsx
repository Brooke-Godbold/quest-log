import PropTypes from "prop-types";

import Button from "../button/Button.component";

import {
  ConfirmationButtonsContainer,
  StyledConfirmationCheck,
} from "./ConfirmationCheck.styles";

function ConfirmationCheck({
  onCloseModal,
  onConfirm,
  children,
  actionLoading,
}) {
  return (
    <StyledConfirmationCheck>
      {children}
      <ConfirmationButtonsContainer>
        <Button disabled={actionLoading} isLight={true} onClick={onConfirm}>
          Confirm
        </Button>
        <Button disabled={actionLoading} isLight={true} onClick={onCloseModal}>
          Cancel
        </Button>
      </ConfirmationButtonsContainer>
    </StyledConfirmationCheck>
  );
}

ConfirmationCheck.propTypes = {
  onCloseModal: PropTypes.func,
  onConfirm: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  actionLoading: PropTypes.bool,
};

export default ConfirmationCheck;
