import UserHeader from "../../features/social/user-header/UserHeader.component";
import SocialFeedContainer from "../../features/social/social-feed-container/SocialFeedContainer.component";
import { StyledUser } from "./User.styles";

function User() {
  return (
    <StyledUser>
      <UserHeader />
      <SocialFeedContainer />
    </StyledUser>
  );
}

export default User;
