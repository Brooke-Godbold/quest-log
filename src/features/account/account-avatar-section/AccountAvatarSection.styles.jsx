import { styled } from "styled-components";
import { CommonInput } from "../../../styles/GlobalStyles";

const StyledAccountAvatarSection = styled.form`
  padding: 5rem;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
  gap: 2rem;

  @media (max-width: 75em) {
    padding: 5rem 1.6rem;
    grid-template-columns: 1fr 2.5fr;
    column-gap: 4rem;
  }

  @media (max-width: 50em) {
    row-gap: 0;
  }

  @media (max-width: 40em) {
    grid-template-columns: 1fr 1.5fr;
    padding: 2.4rem 0.8rem;
  }

  @media (max-width: 30em) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 0;
  }
`;

const Avatar = styled.img`
  border-radius: 50%;
  border: 7px double rgb(34, 34, 34, 0.5);
  grid-row: 1 / -1;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

const UsernameLabel = styled.label`
  font-size: 2.4rem;

  @media (max-width: 50em) {
    font-size: 1.6rem;
  }
`;

const AvatarUploadInput = styled.input`
  ${CommonInput}

  padding: 2rem;

  &::file-selector-button {
    display: none;
  }

  @media (max-width: 45em) {
    padding: 1.4rem;
    width: 100%;
  }
`;

const AvatarErrorContainer = styled.div`
  grid-column: 2;
`;

export {
  StyledAccountAvatarSection,
  Avatar,
  AvatarUploadInput,
  UsernameLabel,
  AvatarErrorContainer,
};
