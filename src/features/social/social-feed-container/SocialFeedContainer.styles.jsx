import { styled } from 'styled-components';
import { CommonButton, CommonScrollBar } from '../../../styles/GlobalStyles';
import { brandMediumUrl } from '../../../data/consts';

const StyledSocialFeedContainer = styled.div`
  flex: auto;
  min-height: 0;
  height: 0;

  display: flex;
  flex-direction: column;

  font-family: ${(props) =>
    props.$isPersonalizable && props.$fontLoaded
      ? props.$fontFamily
      : 'inherit'};

  @media (max-height: 65em) {
    height: 100%;
  }
`;

const SocialFeedContent = styled.div`
  background: ${(props) => (!props.$value ? `url(${brandMediumUrl})` : 'none')};
  background-blend-mode: multiply;
  background-origin: border-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 25%;

  background-color: ${(props) =>
    props.$isPersonalizable && props.$tertiaryColor
      ? props.$tertiaryColor
      : 'var(--color-brand-700)'};

  padding: 1.6rem;
  border-radius: 7px;

  flex: auto;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  min-height: 0;
  overflow: auto;

  ${CommonScrollBar}

  @media (max-height: 65em) {
    overflow: visible;
  }
`;

const SocialFeedButtons = styled.div`
  display: flex;
  justify-content: space-around;

  & select {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const SocialFeedButton = styled.button`
  ${CommonButton}

  background-color: ${(props) =>
    props.$active
      ? props.$isPersonalizable && props.$tertiaryColor
        ? props.$tertiaryColor
        : 'var(--color-brand-700)'
      : props.$isPersonalizable && props.$tertiaryColor
      ? props.$tertiaryColor
      : 'var(--color-brand-600)'};

  filter: ${(props) =>
    props.$isPersonalizable &&
    props.$tertiaryColor &&
    !props.$active &&
    'brightness(75%)'};

  color: ${(props) => props.$isPersonalizable && props.$secondaryColor};

  width: 20%;

  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  & div {
    cursor: pointer;
  }

  &:hover {
    background-color: ${(props) =>
      props.$isPersonalizable && props.$tertiaryColor};

    filter: ${(props) =>
      props.$isPersonalizable && props.$tertiaryColor && 'brightness(125%)'};
  }
`;

export {
  StyledSocialFeedContainer,
  SocialFeedContent,
  SocialFeedButtons,
  SocialFeedButton,
};
