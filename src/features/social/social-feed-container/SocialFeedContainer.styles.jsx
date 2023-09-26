import { styled } from 'styled-components';
import { CommonButton, CommonScrollBar } from '../../../styles/GlobalStyles';
import { brandMediumUrl } from '../../../data/consts';

const StyledSocialFeedContainer = styled.div`
  flex: auto;
  min-height: 0;
  height: 0;

  display: flex;
  flex-direction: column;

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

  background-color: var(--color-brand-700);

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
    props.$active ? 'var(--color-brand-700)' : 'var(--color-brand-600)'};

  width: 20%;

  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  & div {
    cursor: pointer;
  }
`;

export {
  StyledSocialFeedContainer,
  SocialFeedContent,
  SocialFeedButtons,
  SocialFeedButton,
};
