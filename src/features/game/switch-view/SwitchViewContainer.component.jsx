import PropTypes from "prop-types";

import Button from "../../../ui/button/Button.component";
import { StyledSwitchViewContainer } from "./SwitchViewContainer.styles";

function SwitchViewContainer({ setDetailsActive }) {
  return (
    <StyledSwitchViewContainer>
      <Button onClick={() => setDetailsActive(true)}>Game Details</Button>
      <Button onClick={() => setDetailsActive(false)}>Game Hints</Button>
    </StyledSwitchViewContainer>
  );
}

SwitchViewContainer.propTypes = {
  setDetailsActive: PropTypes.func.isRequired,
};

export default SwitchViewContainer;
