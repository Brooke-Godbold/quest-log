import PropTypes from "prop-types";
import {
  ConfirmationButtonsContainer,
  ConfirmationCheckErrorContainer,
  StyledConfirmationCheck,
} from "./ConfirmationCheck.styles";
import Button from "../button/Button.component";
import { FormError } from "../form-error/FormError.styles";

function ConfirmationCheck({
  onCloseModal,
  onConfirm,
  children,
  actionLoading,
  actionError,
}) {
  return (
    <StyledConfirmationCheck>
      {children}
      {actionError && (
        <ConfirmationCheckErrorContainer>
          <FormError>Oops! Looks like something went wrong!</FormError>
        </ConfirmationCheckErrorContainer>
      )}

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
  actionError: PropTypes.bool,
};

export default ConfirmationCheck;
