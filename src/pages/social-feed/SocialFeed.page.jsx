import SocialFeedContainer from "../../features/social/social-feed-container/SocialFeedContainer.component";

import { usePageTitle } from "../../hooks/usePageTitle";

import { StyledSocialFeed } from "./SocialFeed.styles";

function SocialFeed() {
  usePageTitle("Social Feed");

  return (
    <StyledSocialFeed>
      <SocialFeedContainer />
    </StyledSocialFeed>
  );
}

export default SocialFeed;
