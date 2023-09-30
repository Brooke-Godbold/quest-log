import { styled } from 'styled-components';
import { CommonScrollBar, CommonTextArea } from '../../../styles/GlobalStyles';

const StyledAccountProfileDetails = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 5.4rem 0;
  width: 80%;

  @media (max-width: 60em) {
    width: 95%;
  }

  @media (max-width: 50em) {
    width: 100%;
  }

  @media (max-width: 35em) {
    gap: 0;
    margin-bottom: 0;
  }
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

  @media (max-width: 50em) {
    width: 80%;
  }
`;

const AccountProfileBio = styled.textarea`
  ${CommonTextArea}

  height: 25rem;

  ${CommonScrollBar}
`;

const AccountSocialMediaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media (max-width: 40em) {
    width: 100%;
  }
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

  @media (max-width: 80em) {
    & label {
      grid-column: 1 / -1;
    }

    & input {
      grid-column: 2 / -1;
    }

    & svg {
      bottom: 15px;
    }
  }

  @media (max-width: 40em) {
    & label,
    & p,
    & input {
      grid-column: 1 / -1;
    }

    & input {
      width: 100%;
    }

    & svg {
      bottom: 15px;
    }
  }
`;

export {
  StyledAccountProfileDetails,
  ProfileDetailsRow,
  ProfileDetailsErrorContainer,
  ProfileDetailsLabel,
  CurrentlyPlayingContainer,
  AccountProfileBio,
  AccountSocialMediaInputRow,
  AccountSocialMediaContainer,
};
