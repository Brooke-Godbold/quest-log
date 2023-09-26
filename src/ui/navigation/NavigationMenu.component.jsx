import PropTypes from 'prop-types';

import { useUser } from '../../query/auth/useUser';
import { useProfileByUser } from '../../query/profile/useProfileByUser';
import { useGamesByIds } from '../../query/game/useGamesByIds';

import {
  NavigationButton,
  NavigationGameMenuLink,
  NavigationLink,
  NavigationMenuContainer,
} from './NavigationMenu.styles';

function NavigationMenu({
  mainNavigationActive,
  accountNavigationActive,
  handleCloseNavigation,
  handleSwitchNavigation,
  handleLogout,
  isMobileDevice,
}) {
  const { user } = useUser();
  const { profile } = useProfileByUser(user?.id);
  const { gameData } = useGamesByIds(profile?.currentGames);

  return (
    <>
      <NavigationMenuContainer $active={mainNavigationActive}>
        <NavigationLink
          onClick={handleCloseNavigation}
          to="/social/feed?view=trending"
        >
          Trending
        </NavigationLink>
        {user && profile && (
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
              to={`/social/${profile.username}?view=posts`}
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
    </>
  );
}

NavigationMenu.propTypes = {
  mainNavigationActive: PropTypes.bool.isRequired,
  accountNavigationActive: PropTypes.bool.isRequired,
  handleCloseNavigation: PropTypes.func.isRequired,
  handleSwitchNavigation: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isMobileDevice: PropTypes.bool.isRequired,
};

export default NavigationMenu;
