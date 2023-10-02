import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { CommonButton, CommonScrollBar } from '../../../styles/GlobalStyles';

const StyledUserHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4.2rem;

  flex: 0.5;

  font-family: ${(props) =>
    props.$isPersonalizable && props.$fontLoaded
      ? props.$fontFamily
      : 'inherit'};
`;

const UserProfile = styled.div`
  background-color: ${(props) =>
    props.$isPersonalizable && props.$mainColor
      ? props.$mainColor
      : 'var(--color-brand-500)'};

  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border-radius: 7px;
  width: 100%;

  min-height: 35rem;

  padding: 3.6rem;
  position: relative;

  display: flex;
  gap: 50rem;

  @media (max-width: 75em) {
    padding: 2.4rem;
    gap: 35rem;
  }

  @media (max-width: 50em) {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 2.5fr 1fr;
    row-gap: 1.6rem;
    column-gap: 3.6rem;
  }

  @media (max-width: 35em) {
    display: flex;
    flex-direction: column;
    height: 40rem;
  }

  @media (max-width: 20em) {
    padding: 1.2rem;
  }
`;

const UserMain = styled.div`
  color: ${(props) =>
    props.$isPersonalizable && props.$primaryFontColor
      ? props.$primaryFontColor
      : 'inherit'};

  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -20%);

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 75em) {
    max-width: 30rem;
  }

  @media (max-width: 50em) {
    position: static;
    transform: none;
    grid-row: 1 / -1;
  }

  @media (max-width: 35em) {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -30%);
    gap: 0;
  }

  @media (max-width: 35em) {
    position: static;
    transform: none;
    display: grid;
    grid-template-columns: max-content 1fr;
    grid-template-rows: repeat(2, 1fr);
    column-gap: 1.2rem;

    width: 0;
    min-width: 100%;
  }

  @media (max-width: 30em) {
    grid-template-columns: max-content 2fr;
  }

  @media (max-width: 20em) {
    display: flex;
  }
`;

const UserAvatar = styled.img`
  border: double 7px rgba(34, 34, 34, 0.5);
  border-radius: 50%;

  height: 22rem;
  aspect-ratio: 1 / 1;
  object-fit: cover;

  @media (max-width: 50em) {
    height: 16rem;
  }

  @media (max-width: 35em) {
    grid-row: 1 / -1;
    height: 12rem;
    width: auto;
  }

  @media (max-width: 30em) {
    height: 8rem;
  }

  @media (max-width: 20em) {
    display: none;
  }
`;

const UserName = styled.h1`
  font-size: 5.4rem;
  text-align: center;

  width: 100%;
  word-break: break-all;

  @media (max-width: 75em) {
    line-height: 5rem;
  }

  @media (max-width: 50em) {
    font-size: 3.2rem;
    line-height: 3.2rem;
  }

  @media (max-width: 35em) {
    font-size: 2.4rem;
  }
`;

const DisplayName = styled.h3`
  font-size: 1.4rem;
  text-align: center;
  margin-bottom: 0.8rem;
`;

const Heading = styled.h3`
  color: ${(props) =>
    props.$isPersonalizable && props.$tertiaryColor
      ? props.$tertiaryColor
      : 'inherit'};
`;

const FollowersCount = styled.p`
  margin-top: 0.8rem;
  font-weight: 700;
`;

const UserDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  flex: 1;
`;

const SocialMediaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;

  height: 20%;
`;

const SocialMediaButton = styled.a`
  border: none;
  border-radius: 3px;
  box-shadow: 0px 0px 7px 3px rgb(31, 31, 31, 0.25);
  padding: 0.3rem 1.2rem;
  width: 25%;

  background-color: ${(props) =>
    props.$active
      ? props.$isPersonalizable && props.$tertiaryColor
        ? props.$tertiaryColor
        : 'var(--color-brand-700)'
      : 'rgba(122, 122, 122, 0.3)'};

  cursor: ${(props) => (props.$active ? 'pointer' : 'auto')};

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.3s;

  &:hover {
    transform: ${(props) => (props.$active ? 'scale(110%)' : 'scale(100%)')};
  }

  & svg {
    color: ${(props) =>
      props.$active
        ? props.$isPersonalizable && props.$secondaryColor
          ? props.$secondaryColor
          : 'var(--color-brand-500)'
        : 'rgba(85, 85, 85, 0.3)'};
    transform: scale(150%);
  }
`;

const UserBio = styled.p`
  background-color: ${(props) =>
    props.$isPersonalizable && props.$tertiaryColor
      ? props.$tertiaryColor
      : 'var(--color-brand-700)'};

  color: ${(props) =>
    props.$isPersonalizable && props.$secondaryColor
      ? props.$secondaryColor
      : 'var(--color-brand-300)'};

  padding: 1.6rem;
  border-radius: 3px;
  height: 0;
  min-height: 75%;
  overflow: auto;
  font-size: 1.6rem;

  ${CommonScrollBar}

  @media (max-width: 70em) {
    padding: 0.8rem;
    font-size: 1.4rem;
  }

  @media (max-width: 35em) {
    min-height: 75%;
  }
`;

const CurrentlyPlayingContainer = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;

  width: 20%;

  & h3 {
    margin-bottom: 2.4rem;
    text-align: center;

    @media (max-width: 50em) {
      display: none;
    }
  }

  @media (max-width: 75em) {
    width: 100%;
  }

  @media (max-width: 50em) {
    gap: 0;
    flex-direction: row;
  }

  @media (max-width: 35em) {
    display: none;
  }
`;

const CurrentlyPlaying = styled(NavLink)`
  background-color: ${(props) =>
    props.$isPersonalizable && props.$secondaryColor
      ? props.$secondaryColor
      : 'var(--color-brand-200)'};

  color: ${(props) =>
    props.$isPersonalizable && props.$tertiaryColor
      ? props.$tertiaryColor
      : 'var(--color-brand-700)'};

  padding: 1.2rem 0;
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  width: 100%;
  border-radius: 5px;
  border: solid 2px rgba(34, 34, 34, 0.3);
  text-align: center;

  transition: all 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.$isPersonalizable && props.$tertiaryColor
        ? props.$tertiaryColor
        : 'var(--color-brand-700)'};

    color: ${(props) =>
      props.$isPersonalizable && props.$secondaryColor
        ? props.$secondaryColor
        : 'var(--color-brand-100)'};
  }
`;

const UserActionsContainer = styled.div`
  margin-top: 1.2rem;
  display: flex;
  gap: 2.4rem;

  justify-self: center;

  @media (max-width: 27em) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-content: center;
    gap: 1.2rem;
  }

  @media (max-width: 20em) {
    display: flex;
  }
`;

const ActionButton = styled.button`
  border: none;
  border-radius: 3px;
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  padding: 0.8rem 1.2rem;

  background-color: ${(props) =>
    props.$interactable
      ? props.$active
        ? props.$isPersonalizable && props.$tertiaryColor
          ? props.$tertiaryColor
          : 'var(--color-brand-700)'
        : props.$isPersonalizable && props.$secondaryColor
        ? props.$secondaryColor
        : 'var(--color-brand-400)'
      : 'rgba(71, 70, 64, 0.5)'};

  color: ${(props) =>
    props.$interactable
      ? props.$active
        ? props.$isPersonalizable && props.$secondaryColor
          ? props.$secondaryColor
          : 'var(--color-brand-300)'
        : props.$isPersonalizable && props.$tertiaryColor
        ? props.$tertiaryColor
        : 'var(--color-brand-700)'
      : 'rgba(146, 141, 126, 0.5)'};

  font-size: 1.8rem;
  font-weight: 700;
  transition: all 0.3s;

  width: fit-content;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;

  cursor: ${(props) => !props.$interactable && 'auto'};

  &:disabled {
    cursor: auto;
  }

  &:hover {
    transform: ${(props) => props.$interactable && 'scale(110%)'};
  }

  @media (max-width: 35em) {
    font-size: 1.8rem;

    align-self: center;
    justify-self: center;
  }
`;

const AddNewPostButton = styled.button`
  ${CommonButton}

  background-color: ${(props) =>
    props.$isPersonalizable && props.$tertiaryColor};

  color: ${(props) => props.$isPersonalizable && props.$secondaryColor};

  width: 15%;

  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;

  &:hover {
    background-color: ${(props) =>
      props.$isPersonalizable && props.$tertiaryColor};

    filter: ${(props) =>
      props.$isPersonalizable && props.$tertiaryColor && 'brightness(75%)'};
  }

  @media (max-width: 75em) {
    width: 35%;
  }

  @media (max-width: 35em) {
    width: 75%;
  }
`;

const UserHeaderError = styled.h2`
  font-size: 5.4rem;
  text-align: center;
  padding-bottom: 12.8rem;
`;

export {
  StyledUserHeader,
  UserAvatar,
  UserName,
  Heading,
  CurrentlyPlaying,
  CurrentlyPlayingContainer,
  UserHeaderError,
  ActionButton,
  UserBio,
  UserMain,
  UserProfile,
  AddNewPostButton,
  UserDetailsContainer,
  SocialMediaContainer,
  SocialMediaButton,
  UserActionsContainer,
  DisplayName,
  FollowersCount,
};
