import { useState } from "react";

import { HiMenu } from "react-icons/hi";

import { useUser } from "../../query/auth/useUser";
import { useLogout } from "../../query/auth/useLogout";
import { useMessages } from "../../query/message/useMessages";
import { useUnreadMessagesCount } from "../../hooks/useUnreadMessagesCount";

import {
  MobileMenuButton,
  MobileNavLink,
  MobileNavLinkContainer,
  MobileNavigationMenuButton,
  StyledMobileNavigation,
  UnreadMessages,
} from "./MobileNavigation.styles";

function MobileNavigation() {
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);

  const { isAuthenticated, user } = useUser();

  const { logout, isLoggingOut } = useLogout();

  function logoutMobile() {
    logout();
    setIsMobileNavActive(false);
  }

  const { conversations } = useMessages(user?.id);
  const unreadMessagesCount = useUnreadMessagesCount(user, conversations);

  return (
    <StyledMobileNavigation $active={isMobileNavActive}>
      {isMobileNavActive ? (
        <>
          <MobileNavLinkContainer>
            <div>
              <MobileMenuButton onClick={() => setIsMobileNavActive(false)}>
                Back
              </MobileMenuButton>
            </div>
            <div>
              <MobileNavLink
                onClick={() => setIsMobileNavActive(false)}
                to="/search"
              >
                Search
              </MobileNavLink>
            </div>
            <div>
              <MobileNavLink
                onClick={() => setIsMobileNavActive(false)}
                to="/social/feed?view=trending"
              >
                Trending
              </MobileNavLink>
              {isAuthenticated && (
                <>
                  <MobileNavLink
                    onClick={() => setIsMobileNavActive(false)}
                    to="/social/feed?view=following"
                  >
                    Following
                  </MobileNavLink>
                  <MobileNavLink
                    onClick={() => setIsMobileNavActive(false)}
                    to="/social/feed?view=discover"
                  >
                    Discover
                  </MobileNavLink>
                  <MobileNavLink
                    onClick={() => setIsMobileNavActive(false)}
                    to={`/social/${user.id}?view=posts`}
                  >
                    My Feed
                  </MobileNavLink>
                </>
              )}
            </div>
            <div>
              {isAuthenticated ? (
                <>
                  <MobileNavLink
                    onClick={() => setIsMobileNavActive(false)}
                    to="/messages"
                  >
                    <>
                      Messages{" "}
                      {unreadMessagesCount > 0 && (
                        <UnreadMessages>{unreadMessagesCount}</UnreadMessages>
                      )}
                    </>
                  </MobileNavLink>
                  <MobileNavLink
                    onClick={() => setIsMobileNavActive(false)}
                    to="/account/profile"
                  >
                    Profile
                  </MobileNavLink>
                  <MobileNavLink
                    onClick={() => setIsMobileNavActive(false)}
                    to="/account/avatar"
                  >
                    Avatar
                  </MobileNavLink>
                  <MobileNavLink
                    onClick={() => setIsMobileNavActive(false)}
                    to="/account/hints?type=user"
                  >
                    My Hints
                  </MobileNavLink>
                  <MobileNavLink
                    onClick={() => setIsMobileNavActive(false)}
                    to="/account/hints?type=upvotes"
                  >
                    Upvoted Hints
                  </MobileNavLink>
                  <MobileNavLink
                    onClick={() => setIsMobileNavActive(false)}
                    to="/account/hints?type=downvotes"
                  >
                    Downvoted Hints
                  </MobileNavLink>
                  <MobileNavLink
                    onClick={() => setIsMobileNavActive(false)}
                    to="/account/reset-password"
                  >
                    Reset Password
                  </MobileNavLink>
                </>
              ) : (
                <MobileNavLink
                  onClick={() => setIsMobileNavActive(false)}
                  to="/login"
                >
                  Login
                </MobileNavLink>
              )}
            </div>
            {isAuthenticated && (
              <div>
                <MobileMenuButton
                  onClick={logoutMobile}
                  disabled={isLoggingOut}
                >
                  Logout
                </MobileMenuButton>
              </div>
            )}
          </MobileNavLinkContainer>
        </>
      ) : (
        <MobileNavigationMenuButton onClick={() => setIsMobileNavActive(true)}>
          <HiMenu />
        </MobileNavigationMenuButton>
      )}
    </StyledMobileNavigation>
  );
}

export default MobileNavigation;
