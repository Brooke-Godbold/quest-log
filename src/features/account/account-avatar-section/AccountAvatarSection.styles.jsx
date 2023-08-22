import { styled } from "styled-components";
import { CommonInput } from "../../../styles/GlobalStyles";

const StyledAccountAvatarSection = styled.form`
  padding: 5rem;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
  gap: 2rem;
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
`;

const AvatarUploadInput = styled.input`
  ${CommonInput}

  padding: 2rem 2rem;

  &::file-selector-button {
    display: none;
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
