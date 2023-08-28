import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const PostGameTagContainer = styled.div`
  width: 25rem;
`;

const PostGameTag = styled(NavLink)`
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border: none;
  background-color: var(--color-brand-700);
  color: var(--color-brand-200);
  border-radius: 3px;
  font-size: 1.4rem;
  padding: 0.6rem 1.8rem;

  transition: all 0.3s;

  &:hover {
    transform: scale(105%);
  }
`;

export { PostGameTagContainer, PostGameTag };
