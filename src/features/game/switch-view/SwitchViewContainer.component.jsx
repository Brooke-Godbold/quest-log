import PropTypes from "prop-types";
import { StyledSwitchViewContainer } from "./SwitchViewContainer.styles";
import { SocialFeedButton } from "../../social/social-feed-container/SocialFeedContainer.styles";

import { TbMessage2Search } from "react-icons/tb";
import { BsTrophyFill } from "react-icons/bs";
import { ResponsiveButtonContent } from "../../../ui/responsive-button-content/ResponsiveButtonContent.styles";

function SwitchViewContainer({ detailsActive, setDetailsActive }) {
  return (
    <StyledSwitchViewContainer>
      <SocialFeedButton
        $active={detailsActive}
        onClick={() => setDetailsActive(true)}
      >
        <ResponsiveButtonContent>
          <p>Game Details</p>
          <TbMessage2Search />
        </ResponsiveButtonContent>
      </SocialFeedButton>
      <SocialFeedButton
        $active={!detailsActive}
        onClick={() => setDetailsActive(false)}
      >
        <ResponsiveButtonContent>
          <p>Game Hints</p>
          <BsTrophyFill />
        </ResponsiveButtonContent>
      </SocialFeedButton>
    </StyledSwitchViewContainer>
  );
}

SwitchViewContainer.propTypes = {
  setDetailsActive: PropTypes.func.isRequired,
  detailsActive: PropTypes.bool.isRequired,
};

export default SwitchViewContainer;
