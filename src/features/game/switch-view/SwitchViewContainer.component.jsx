import PropTypes from "prop-types";
import { StyledSwitchViewContainer } from "./SwitchViewContainer.styles";
import { SocialFeedButton } from "../../social/social-feed-container/SocialFeedContainer.styles";

function SwitchViewContainer({ setDetailsActive }) {
  return (
    <StyledSwitchViewContainer>
      <SocialFeedButton onClick={() => setDetailsActive(true)}>
        Game Details
      </SocialFeedButton>
      <SocialFeedButton onClick={() => setDetailsActive(false)}>
        Game Hints
      </SocialFeedButton>
    </StyledSwitchViewContainer>
  );
}

SwitchViewContainer.propTypes = {
  setDetailsActive: PropTypes.func.isRequired,
};

export default SwitchViewContainer;
