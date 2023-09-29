import PropTypes from 'prop-types';

import { PostGameTag, PostGameTagContainer } from './GameTag.styles';

import { usePersonalization } from '../../contexts/PersonalizationContext';

function GameTag({ to, children }) {
  const { isPersonalizable, personalization } = usePersonalization();

  return (
    <PostGameTagContainer>
      <PostGameTag
        $isPersonalizable={isPersonalizable}
        $tertiaryColor={personalization?.tertiaryColor}
        $secondaryColor={personalization?.secondaryColor}
        to={to}
      >
        {children}
      </PostGameTag>
    </PostGameTagContainer>
  );
}

GameTag.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default GameTag;
