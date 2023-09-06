import { useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";

import { useUser } from "../../query/auth/useUser";
import { useProfileByUser } from "../../query/profile/useProfileByUser";
import { useLogout } from "../../query/auth/useLogout";
import { useMessages } from "../../query/message/useMessages";
import { useUnreadMessagesCount } from "../../hooks/useUnreadMessagesCount";
import { useGamesByIds } from "../../query/game/useGamesByIds";
import { useConversations } from "../../contexts/ConversationsContext";

import { HiPlus } from "react-icons/hi";
import { BsEnvelopeOpen, BsEnvelopePlusFill } from "react-icons/bs";

import LoginModal from "../login-modal/LoginModal.component";
import AddPostButton from "../../features/social/add-post-button/AddPostButton.component";
import Search from "../search/Search.component";

import {
  HeaderActionButton,
  HeaderActionLink,
  NavigationButton,
  NavigationContainer,
  NavigationGameMenuLink,
  NavigationGamesContainer,
  NavigationGamesLink,
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

function Navigation() {
  const { user } = useUser();
  const { profile } = useProfileByUser(user?.id);
  const { gameData } = useGamesByIds(profile?.currentGames);

  const { logout } = useLogout();

  const isSmallDevice = useMediaQuery("only screen and (max-width : 65em)");
  const isMobileDevice = useMediaQuery("only screen and (max-width : 40em)");

  const { setCurrentConversation } = useConversations();
  const { conversations } = useMessages(user?.id);
  const unreadMessagesCount = useUnreadMessagesCount(user, conversations);

  const [navigationActive, setNavigationActive] = useState(false);
  const [accountNavigationActive, setAccountNavigationActive] = useState(false);

  function handleToggleNavigation() {
    if (navigationActive || accountNavigationActive) {
      setNavigationActive(false);
      setAccountNavigationActive(false);
    } else {
      setNavigationActive(true);
    }
  }

  function handleSwitchNavigation() {
    setNavigationActive((navigationActive) => !navigationActive);
    setAccountNavigationActive(
      (accountNavigationActive) => !accountNavigationActive
    );
  }

  function handleCloseNavigation() {
    setNavigationActive(false);
    setAccountNavigationActive(false);
  }

  function handleLogout() {
    handleCloseNavigation();
    setCurrentConversation(null);
    logout();
  }

  return (
    <StyledNavigation>
      <NavigationOverlay
        $active={navigationActive || accountNavigationActive}
      />
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
                onOpenCallback={handleCloseNavigation}
                styledPostButton={
                  <HeaderActionButton>
                    <HiPlus />
                  </HeaderActionButton>
                }
              />
              <HeaderActionLink to="/messages" onClick={handleCloseNavigation}>
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
        {!isMobileDevice && (
          <NavigationGamesContainer
            $active={navigationActive || accountNavigationActive}
          >
            {gameData?.map((game) => (
              <NavigationGamesLink
                key={game.id}
                onClick={handleCloseNavigation}
                to={`/game/${game.id}`}
              >
                <NavigationMenuImage src={game.imageUrl} />
              </NavigationGamesLink>
            ))}
          </NavigationGamesContainer>
        )}
        <NavigationMenuContainer $active={navigationActive}>
          <NavigationLink
            onClick={handleCloseNavigation}
            to="/social/feed?view=trending"
          >
            Trending
          </NavigationLink>
          {user ? (
            <>
              <NavigationLink
                onClick={handleCloseNavigation}
                to="/social/feed?view=following"
              >
                Following
              </NavigationLink>
              <NavigationLink
                onClick={handleCloseNavigation}
                to="/social/feed?view=discover"
              >
                Discover
              </NavigationLink>
              <NavigationLink
                onClick={handleCloseNavigation}
                to={`/social/${user.id}?view=posts`}
              >
                Public Profile
              </NavigationLink>
              {isMobileDevice &&
                gameData?.map((game) => (
                  <NavigationGameMenuLink
                    key={`currently_playing_game_${game.id}`}
                    onClick={handleCloseNavigation}
                    to={`/game/${game.id}`}
                  >
                    {game.name}
                  </NavigationGameMenuLink>
                ))}
              <NavigationButton onClick={handleSwitchNavigation}>
                Account
              </NavigationButton>
              <NavigationButton onClick={handleLogout}>Logout</NavigationButton>
            </>
          ) : isSmallDevice ? (
            <NavigationLink onClick={handleCloseNavigation} to="/login">
              Login
            </NavigationLink>
          ) : (
            <LoginModal
              onOpenCallback={handleCloseNavigation}
              loginButton={<NavigationButton>Login</NavigationButton>}
            />
          )}
        </NavigationMenuContainer>
        <NavigationMenuContainer $active={accountNavigationActive}>
          <NavigationButton onClick={handleSwitchNavigation}>
            Back
          </NavigationButton>
          <NavigationLink onClick={handleCloseNavigation} to="/account/profile">
            Account Profile
          </NavigationLink>
          <NavigationLink onClick={handleCloseNavigation} to="/account/avatar">
            Avatar
          </NavigationLink>
          <NavigationLink onClick={handleCloseNavigation} to="/account/privacy">
            Privacy Settings
          </NavigationLink>
          <NavigationLink
            onClick={handleCloseNavigation}
            to="/account/users?view=following"
          >
            Following List
          </NavigationLink>
          <NavigationLink
            onClick={handleCloseNavigation}
            to="/account/users?view=blocked"
          >
            Blocked List
          </NavigationLink>
          <NavigationLink
            onClick={handleCloseNavigation}
            to="/account/hints?type=user"
          >
            My Hints
          </NavigationLink>
          <NavigationLink
            onClick={handleCloseNavigation}
            to="/account/hints?type=upvotes"
          >
            My Upvoted Hints
          </NavigationLink>
          <NavigationLink
            onClick={handleCloseNavigation}
            to="/account/hints?type=downvotes"
          >
            My Downvoted Hints
          </NavigationLink>
          <NavigationLink
            onClick={handleCloseNavigation}
            to="/account/reset-password"
          >
            Reset Password
          </NavigationLink>
        </NavigationMenuContainer>
      </NavigationContainer>
      <Search navigationActive={navigationActive} />
    </StyledNavigation>
  );
}

export default Navigation;
