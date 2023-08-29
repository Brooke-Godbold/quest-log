import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
import { CommonButton, CommonScrollBar } from "../../../styles/GlobalStyles";

const StyledUserHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4.2rem;

  flex: 0.5;
`;

const UserProfile = styled.div`
  background-color: var(--color-brand-500);
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border-radius: 7px;
  width: 100%;

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
`;

const UserMain = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -20%);

  display: flex;
  flex-direction: column;
  align-items: center;

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
`;

const UserName = styled.h1`
  margin-top: 1.6rem;
  font-size: 5.4rem;

  @media (max-width: 50em) {
    margin-top: 0;
  }
`;

const Heading = styled.h3``;

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
    props.$active ? "var(--color-brand-700)" : "rgba(122, 122, 122, 0.3)"};

  cursor: ${(props) => (props.$active ? "pointer" : "auto")};

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.3s;

  &:hover {
    transform: ${(props) => (props.$active ? "scale(110%)" : "scale(100%)")};
  }

  & svg {
    color: ${(props) =>
      props.$active ? "var(--color-brand-500)" : "rgba(85, 85, 85, 0.3)"};
    transform: scale(150%);
  }
`;

const UserBio = styled.p`
  background-color: var(--color-brand-700);
  color: var(--color-brand-300);
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
    min-height: 0;
    margin-top: 15rem;
    flex: 5;
  }
`;

const CurrentlyPlayingContainer = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
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
    flex: initial;
  }
`;

const CurrentlyPlaying = styled(NavLink)`
  padding: 1.2rem 0;
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  width: 100%;
  border-radius: 5px;
  border: solid 2px rgba(34, 34, 34, 0.3);
  background-color: var(--color-brand-200);
  color: var(--color-brand-700);
  text-align: center;

  transition: all 0.3s;

  &:hover {
    background-color: var(--color-brand-600);
    color: var(--color-brand-100);
  }
`;

const FollowButton = styled.button`
  margin-top: 2.4rem;
  border: none;
  border-radius: 3px;
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  padding: 0.6rem 2.4rem;

  background-color: ${(props) =>
    props.$following ? "var(--color-brand-700)" : "var(--color-brand-400)"};
  color: ${(props) =>
    props.$following ? "var(--color-brand-300)" : "var(--color-brand-700)"};

  font-size: 2.4rem;
  font-weight: 700;
  transition: all 0.3s;

  display: flex;
  align-items: center;

  & svg {
    margin-left: 2rem;
  }

  &:hover {
    transform: scale(110%);
  }
`;

const AddNewPostButton = styled.button`
  ${CommonButton}

  width: 15%;

  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
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
  FollowButton,
  UserBio,
  UserMain,
  UserProfile,
  AddNewPostButton,
  UserDetailsContainer,
  SocialMediaContainer,
  SocialMediaButton,
};
