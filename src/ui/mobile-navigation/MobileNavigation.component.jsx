import { HiMenu } from "react-icons/hi";
import {
  MobileMenuButton,
  MobileNavLink,
  MobileNavLinkContainer,
  MobileNavigationMenuButton,
  StyledMobileNavigation,
} from "./MobileNavigation.styles";
import { useUser } from "../../features/auth/useUser";
import { useState } from "react";
import { useLogout } from "../../features/auth/useLogout";

function MobileNavigation() {
  const [isMobileNavActive, setIsMobileNavActive] = useState(false);

  const { isAuthenticated, user } = useUser();

  const { logout, isLoggingOut } = useLogout();

  function logoutMobile() {
    logout();
    setIsMobileNavActive(false);
  }

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
              {isAuthenticated && (
                <MobileNavLink
                  onClick={() => setIsMobileNavActive(false)}
                  to={`/social/${user.id}`}
                >
                  My Feed
                </MobileNavLink>
              )}
            </div>
            <div>
              {isAuthenticated ? (
                <>
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
