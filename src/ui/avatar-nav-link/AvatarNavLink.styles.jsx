import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const StyledAvatarNavLink = styled(NavLink)`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-self: flex-start;

  & img,
  & h4 {
    transition: all 0.3s;
  }

  &:hover {
    & img {
      transform: scale(110%);
      box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
    }

    & h4 {
      transform: scale(110%);
    }
  }
`;

const UserAvatar = styled.img`
  height: 6.5rem;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 50%;
  border: 6px double rgb(51, 51, 51, 0.7);
`;

const UserName = styled.h4`
  margin-top: 0.5rem;
  align-self: flex-start;
`;

export { StyledAvatarNavLink, UserAvatar, UserName };
