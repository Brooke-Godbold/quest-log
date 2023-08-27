import { styled } from "styled-components";
import { NavLink } from "react-router-dom";

const StyledSocialFeedPost = styled.div`
  background-color: var(--color-brand-500);
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border-radius: 5px;

  display: flex;
  flex-direction: column;

  padding: 2.4rem;

  transition: all 0.3s;

  &:hover {
    background-color: var(--color-brand-400);
  }
`;

const PostContent = styled.p`
  margin-top: 2.4rem;
`;

const PostDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.4rem;

  @media (max-width: 35em) {
    flex-direction: column;
    gap: 1.6rem;
  }
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

const PostCreatedTime = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
`;

export {
  StyledSocialFeedPost,
  PostCreatedTime,
  PostContent,
  PostDetails,
  PostGameTag,
};
