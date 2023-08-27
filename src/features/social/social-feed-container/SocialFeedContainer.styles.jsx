import { styled } from "styled-components";
import { CommonButton, CommonScrollBar } from "../../../styles/GlobalStyles";

const StyledSocialFeedContainer = styled.div`
  flex: auto;
  min-height: 0;
  height: 0;

  display: flex;
  flex-direction: column;
`;

const SocialFeedContent = styled.div`
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
`;

const SocialFeedButtons = styled.div`
  display: flex;
  justify-content: space-around;
`;

const SocialFeedButton = styled.button`
  ${CommonButton}

  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

export {
  StyledSocialFeedContainer,
  SocialFeedContent,
  SocialFeedButtons,
  SocialFeedButton,
};
