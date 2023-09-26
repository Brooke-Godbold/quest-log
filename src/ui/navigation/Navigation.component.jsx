import { useEffect, useState } from 'react';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useUser } from '../../query/auth/useUser';
import { useProfileByUser } from '../../query/profile/useProfileByUser';
import { useLogout } from '../../query/auth/useLogout';
import { useMessages } from '../../query/message/useMessages';
import { useUnreadMessagesCount } from '../../hooks/useUnreadMessagesCount';
import { useGamesByIds } from '../../query/game/useGamesByIds';
import { useConversations } from '../../contexts/ConversationsContext';

import { HiPlus } from 'react-icons/hi';
import { BsEnvelopeOpen, BsEnvelopePlusFill } from 'react-icons/bs';
import { VscHome } from 'react-icons/vsc';
import { RiLoginCircleLine } from 'react-icons/ri';
import { MdPersonAddAlt } from 'react-icons/md';

import LoginModal from '../login-modal/LoginModal.component';
import AddPostButton from '../../features/social/add-post-button/AddPostButton.component';
import Search from '../search/Search.component';
import Spinner from '../spinner/Spinner';
import NavigationMenu from './NavigationMenu.component';
import Notification from '../notification/Notification.component';

import {
  HeaderActionButton,
  HeaderActionLink,
  NavigationCircleButton,
  NavigationCircleContainer,
  NavigationCircleText,
  NavigationContainer,
  NavigationGamesContainer,
  NavigationGamesLink,
  NavigationHeader,
  NavigationMenuButton,
  NavigationMenuImage,
  NavigationOverlay,
  StyledNavigation,
  UnreadMessages,
} from './Navigation.styles';

import { anonymousImageUrl } from '../../data/consts';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isGettingUser } = useUser();
  const { profile, isGettingProfile, isFetchingProfile } = useProfileByUser(
    user?.id
  );
  const { gameData } = useGamesByIds(profile?.currentGames);

  const isLoading = isGettingUser || isGettingProfile || isFetchingProfile;

  const { logout } = useLogout();

  const isSmallDevice = useMediaQuery('only screen and (max-width : 65em)');
  const isMobileDevice = useMediaQuery('only screen and (max-width : 40em)');

  const [loginToast, setLoginToast] = useState(null);

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

  useEffect(() => {
    if (user && loginToast) {
      toast.dismiss(loginToast?.id);
      setLoginToast(null);
    }

    if (loginToast || user || isGettingUser) return;

    setLoginToast(
      toast(
        (t) => (
          <Notification
            toastId={t.id}
            link={<a href="/login">Login now to join the conversation!</a>}
          />
        ),
        {
          duration: Infinity,
        }
      )
    );
  }, [loginToast, user, isGettingUser]);

  return (
    <StyledNavigation>
      <NavigationOverlay
        $active={navigationActive || accountNavigationActive}
      />
      <NavigationContainer>
        <NavigationCircleContainer>
          <NavigationCircleButton
            onClick={() => {
              handleCloseNavigation();
              navigate('/social/feed', {
                replace: location.pathname === '/social/feed',
              });
            }}
          >
            <VscHome />
            <NavigationCircleText>Home</NavigationCircleText>
          </NavigationCircleButton>
          {!user && !isGettingUser ? (
            <>
              {isSmallDevice ? (
                <NavigationCircleButton
                  onClick={() => {
                    handleCloseNavigation();
                    toast.dismiss(loginToast?.id);
                    navigate('/login');
                  }}
                >
                  <RiLoginCircleLine />
                  <NavigationCircleText>Login</NavigationCircleText>
                </NavigationCircleButton>
              ) : (
                <LoginModal
                  onOpenCallback={handleCloseNavigation}
                  loginButton={
                    <NavigationCircleButton>
                      <RiLoginCircleLine />
                      <NavigationCircleText>Login</NavigationCircleText>
                    </NavigationCircleButton>
                  }
                />
              )}
              <NavigationCircleButton
                onClick={() => {
                  handleCloseNavigation();
                  toast.dismiss(loginToast?.id);
                  navigate('/signup');
                }}
              >
                <MdPersonAddAlt />
                <NavigationCircleText>Sign Up</NavigationCircleText>
              </NavigationCircleButton>
            </>
          ) : (
            <NavigationHeader>
              <NavigationMenuButton onClick={handleToggleNavigation}>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <NavigationMenuImage
                    src={profile ? profile.avatarUrl : anonymousImageUrl}
                  />
                )}
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
                  <HeaderActionLink
                    to="/messages"
                    onClick={handleCloseNavigation}
                  >
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
              {!isMobileDevice && (
                <NavigationGamesContainer
                  $active={navigationActive || accountNavigationActive}
                >
                  {gameData?.map((game) => (
                    <NavigationGamesLink
                      key={game.id}
                      onClick={handleCloseNavigation}
                      to={`/game/${game.id}`}
                      replace={location.pathname === `/game/${game.id}`}
                      $active={navigationActive || accountNavigationActive}
                    >
                      <NavigationMenuImage src={game.imageUrl} />
                    </NavigationGamesLink>
                  ))}
                </NavigationGamesContainer>
              )}
            </NavigationHeader>
          )}
        </NavigationCircleContainer>

        <NavigationMenu
          mainNavigationActive={navigationActive}
          accountNavigationActive={accountNavigationActive}
          handleCloseNavigation={handleCloseNavigation}
          handleSwitchNavigation={handleSwitchNavigation}
          handleLogout={handleLogout}
          isMobileDevice={isMobileDevice}
        />
      </NavigationContainer>
      <Search navigationActive={navigationActive} />
    </StyledNavigation>
  );
}

export default Navigation;
