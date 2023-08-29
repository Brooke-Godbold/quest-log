import { styled } from "styled-components";
import { CommonScrollBar } from "../../../styles/GlobalStyles";

const StyledAccountProfileDetails = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 5.4rem 0;
  width: 80%;
`;

const ProfileDetailsRow = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 4fr;
  gap: 0 7.2rem;
  align-items: center;

  @media (max-width: 35em) {
    display: flex;
    flex-direction: column;
    gap: 2.4rem 0;
  }
`;

const ProfileDetailsLabel = styled.label`
  font-size: 2.4rem;

  @media (max-width: 80em) {
    font-size: 1.8rem;
  }
`;

const ProfileDetailsErrorContainer = styled.div`
  grid-column: 2;
`;

const CurrentlyPlayingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const CurrentlyPlayingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

const CurrentlyPlaying = styled.select`
  padding: 1rem 2rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-brand-50);
  color: var(--color-brand-600);
  width: 100%;
`;

const CurrentlyPlayingButton = styled.button`
  background-color: var(--color-brand-300);
  border: none;
  border-radius: 50%;
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  height: 100%;
  width: auto;
  padding: 0.75rem;
  transition: all 0.3s;
  transform: scale(100%);

  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--color-brand-400);
    transform: scale(125%);
  }

  & svg {
    transform: scale(150%);
    color: var(--color-brand-700);
  }
`;

const AccountProfileBio = styled.textarea`
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border: none;
  border-radius: 3px;
  background-color: var(--color-brand-50);
  color: var(--color-brand-600);
  height: 25rem;
  width: 100%;
  padding: 1.6rem;

  ${CommonScrollBar}
`;

const AccountSocialMediaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const AccountSocialMediaInputRow = styled.div`
  position: relative;

  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr 3.5fr;
  gap: 0.8rem;

  & label {
    font-size: 2rem;
  }

  & p {
    font-weight: 700;
    justify-self: end;
  }

  & svg {
    position: absolute;
    right: 15px;
    color: var(--color-brand-400);
    transform: scale(150%);
    pointer-events: none;
  }
`;

export {
  StyledAccountProfileDetails,
  ProfileDetailsRow,
  ProfileDetailsErrorContainer,
  ProfileDetailsLabel,
  CurrentlyPlayingContainer,
  CurrentlyPlayingRow,
  CurrentlyPlaying,
  CurrentlyPlayingButton,
  AccountProfileBio,
  AccountSocialMediaInputRow,
  AccountSocialMediaContainer,
};
