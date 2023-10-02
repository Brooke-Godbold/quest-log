import PropTypes from 'prop-types';

import { useParams, useSearchParams } from 'react-router-dom';

import { TbMessage2Search } from 'react-icons/tb';
import { BsStickyFill, BsTrophyFill } from 'react-icons/bs';

import { useGame } from '../../../query/game/useGame';

import { StyledSwitchViewContainer } from './SwitchViewContainer.styles';
import { SocialFeedButton } from '../../social/social-feed-container/SocialFeedContainer.styles';
import { ResponsiveButtonContent } from '../../../ui/responsive-button-content/ResponsiveButtonContent.styles';

function SwitchViewContainer({ detailsActive, setDetailsActive }) {
  const { id } = useParams();
  const { gameData } = useGame(id);

  const [searchParams, setSearchParams] = useSearchParams();

  function setView(view) {
    searchParams.set('view', view);
    searchParams.delete('search');
    setSearchParams(searchParams, { replace: true });
  }

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
      {gameData?.isReleased && (
        <SocialFeedButton
          $active={!detailsActive}
          onClick={() => {
            setDetailsActive(false);
            setView('hints');
          }}
        >
          <ResponsiveButtonContent>
            <p>Game Hints</p>
            <BsTrophyFill />
          </ResponsiveButtonContent>
        </SocialFeedButton>
      )}
      <SocialFeedButton
        $active={!detailsActive}
        onClick={() => {
          setDetailsActive(false);
          setView('posts');
        }}
      >
        <ResponsiveButtonContent>
          <p>Game Posts</p>
          <BsStickyFill />
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
