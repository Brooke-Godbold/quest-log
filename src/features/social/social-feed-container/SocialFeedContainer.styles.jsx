import { styled } from "styled-components";
import { CommonButton, CommonScrollBar } from "../../../styles/GlobalStyles";
import { brandDarkUrl } from "../../../data/consts";

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
    props.$active ? "var(--color-brand-700)" : "var(--color-brand-600)"};

  width: 25%;

  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  & div {
    cursor: pointer;
  }
`;

const SocialFeedEmpty = styled.div`
  background: url(${brandDarkUrl});
  background-blend-mode: multiply;
  background-origin: border-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 25%;

  width: 100%;
  height: 100%;
  text-align: center;
  font-weight: 700;
  font-size: 7.4rem;
  color: var(--color-brand-600);

  padding: 20rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export {
  StyledSocialFeedContainer,
  SocialFeedContent,
  SocialFeedButtons,
  SocialFeedButton,
  SocialFeedEmpty,
};
