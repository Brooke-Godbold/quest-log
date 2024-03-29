import PropTypes from 'prop-types';

import { useParams, useSearchParams } from 'react-router-dom';

import { BsStickyFill, BsTrophyFill } from 'react-icons/bs';

import { useGame } from '../../../query/game/useGame';

import HintListHeader from './HintListHeader.component';
import HintListBody from './HintListBody.component';

import {
  SocialFeedButton,
  SocialFeedButtons,
} from '../../social/social-feed-container/SocialFeedContainer.styles';
import { ResponsiveButtonContent } from '../../../ui/responsive-button-content/ResponsiveButtonContent.styles';
import { StyledHintListSection } from './HintList.styles';

import { useMediaQuery } from '@uidotdev/usehooks';

function HintListSection({ detailsActive }) {
  const { id } = useParams();
  const { gameData } = useGame(id);

  const isSmallDevice = useMediaQuery('only screen and (max-width : 100em)');

  const [searchParams, setSearchParams] = useSearchParams();

  function setView(view) {
    searchParams.set('view', view);
    searchParams.delete('search');
    setSearchParams(searchParams, { replace: true });
  }

  return (
    <StyledHintListSection $detailsActive={detailsActive}>
      {!isSmallDevice && (
        <SocialFeedButtons>
          {gameData?.isReleased && (
            <SocialFeedButton
              $active={searchParams.get('view') === 'hints'}
              onClick={() => setView('hints')}
            >
              <ResponsiveButtonContent>
                <p>Hints</p>
                <BsTrophyFill />
              </ResponsiveButtonContent>
            </SocialFeedButton>
          )}
          <SocialFeedButton
            $active={searchParams.get('view') === 'posts'}
            onClick={() => setView('posts')}
          >
            <ResponsiveButtonContent>
              <p>Posts</p>
              <BsStickyFill />
            </ResponsiveButtonContent>
          </SocialFeedButton>
        </SocialFeedButtons>
      )}
      <HintListHeader />
      <HintListBody />
    </StyledHintListSection>
  );
}

HintListSection.propTypes = {
  detailsActive: PropTypes.bool.isRequired,
};

export default HintListSection;
