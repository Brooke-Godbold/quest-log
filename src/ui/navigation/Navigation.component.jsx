import { useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";

import { useUser } from "../../query/auth/useUser";
import { useProfileByUser } from "../../query/profile/useProfileByUser";
import { useLogout } from "../../query/auth/useLogout";
import { useMessages } from "../../query/message/useMessages";
import { useUnreadMessagesCount } from "../../hooks/useUnreadMessagesCount";

import { HiPlus } from "react-icons/hi";
import { BsEnvelopeOpen, BsEnvelopePlusFill } from "react-icons/bs";

import LoginModal from "../login-modal/LoginModal.component";
import AddPostButton from "../../features/social/add-post-button/AddPostButton.component";

import {
  HeaderActionButton,
  HeaderActionLink,
  NavigationButton,
  NavigationContainer,
  NavigationHeader,
  NavigationLink,
  NavigationMenuButton,
  NavigationMenuContainer,
  NavigationMenuImage,
  NavigationOverlay,
  StyledNavigation,
  UnreadMessages,
} from "./Navigation.styles";

import { anonymousImageUrl } from "../../data/consts";
import Search from "../search/Search.component";

function Navigation() {
  const { user } = useUser();
  const { profile } = useProfileByUser(user?.id);

  const { logout } = useLogout();

  const isSmallDevice = useMediaQuery("only screen and (max-width : 65em)");

  const { conversations } = useMessages(user?.id);
  const unreadMessagesCount = useUnreadMessagesCount(user, conversations);

  const [navigationActive, setNavigationActive] = useState(false);

  function handleToggleNavigation() {
    setNavigationActive((navigationActive) => !navigationActive);
  }

  return (
    <StyledNavigation>
      <NavigationOverlay $active={navigationActive} />
      <NavigationContainer>
        <NavigationHeader>
          <NavigationMenuButton onClick={handleToggleNavigation}>
            <NavigationMenuImage
              src={profile ? profile.avatarUrl : anonymousImageUrl}
            />
          </NavigationMenuButton>
          {user && (
            <>
              <AddPostButton
                onOpenCallback={() => setNavigationActive(false)}
                styledPostButton={
                  <HeaderActionButton>
                    <HiPlus />
                  </HeaderActionButton>
                }
              />
              <HeaderActionLink to="/messages">
                {unreadMessagesCount > 0 ? (
                  <>
                    <BsEnvelopePlusFill />
                    <UnreadMessages></UnreadMessages>
                  </>
                ) : (
                  <BsEnvelopeOpen />
                )}
              </HeaderActionLink>
            </>
          )}
        </NavigationHeader>
        <NavigationMenuContainer $active={navigationActive}>
          <NavigationLink
            onClick={handleToggleNavigation}
            to="/social/feed?view=trending"
          >
            Trending
          </NavigationLink>
          {user ? (
            <>
              <NavigationLink
                onClick={handleToggleNavigation}
                to="/social/feed?view=following"
              >
                Following
              </NavigationLink>
              <NavigationLink
                onClick={handleToggleNavigation}
                to="/social/feed?view=discover"
              >
                Discover
              </NavigationLink>
              <NavigationLink
                onClick={handleToggleNavigation}
                to={`/social/${user.id}?view=posts`}
              >
                Profile
              </NavigationLink>
              <NavigationLink
                onClick={handleToggleNavigation}
                to="/account/profile"
              >
                Account
              </NavigationLink>
              <NavigationButton
                onClick={() => {
                  handleToggleNavigation();
                  logout();
                }}
              >
                Logout
              </NavigationButton>
            </>
          ) : isSmallDevice ? (
            <NavigationLink onClick={handleToggleNavigation} to="/login">
              Login
            </NavigationLink>
          ) : (
            <LoginModal
              onOpenCallback={handleToggleNavigation}
              loginButton={<NavigationButton>Login</NavigationButton>}
            />
          )}
        </NavigationMenuContainer>
      </NavigationContainer>
      <Search navigationActive={navigationActive} />
    </StyledNavigation>
  );
}

export default Navigation;
