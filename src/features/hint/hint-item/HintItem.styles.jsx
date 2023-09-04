import { styled } from "styled-components";

const StyledHintItem = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 0.5rem;

  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border-radius: 5px;
  padding: 1.8rem 1.8rem;
  background-color: var(--color-brand-500);

  transition: all 0.3s;

  &:hover {
    background-color: var(--color-brand-400);
  }

  @media (max-width: 30em) {
    display: flex;
    flex-direction: column;
  }
`;

const NavLinkContainer = styled.div`
  display: flex;
`;

const HintTagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  grid-column: 1 / -1;
`;

const HintTag = styled.div`
  background-color: var(--color-brand-700);
  color: #bbb;
  border-radius: 4px;
  padding: 0.25rem 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: capitalize;
`;

const HintActionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-self: right;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
`;

const HintDeleteButton = styled.button`
  border: none;
  background-color: transparent;
  margin-right: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.3s;

  &:hover {
    transform: scale(120%);
  }

  & svg {
    transform: scale(120%);
    color: var(--color-red-800);
  }

  & svg:hover {
    color: var(--color-red-600);
  }
`;

const Upvote = styled.button`
  color: ${(props) =>
    props.$authorized && props.$canVote ? "#248f09" : "#333"};
  transition: all 0.3s;
  background-color: transparent;
  transform: none;
  cursor: ${(props) =>
    props.$authorized && props.$canVote ? "pointer" : "auto"};
  border: none;

  & svg {
    border: ${(props) =>
      props.$authorized && props.$voted ? "2px solid #248f09" : "none"};
    border-radius: 50%;
    height: 100%;
    width: auto;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    transform: ${(props) =>
      props.$authorized && props.$canVote ? "scale(150%)" : "none"};
  }
`;

const Downvote = styled.button`
  color: ${(props) =>
    props.$authorized && props.$canVote ? "#8f1209" : "#333"};
  transition: all 0.3s;
  border: none;
  background-color: transparent;
  transform: none;
  cursor: ${(props) =>
    props.$authorized && props.$canVote ? "pointer" : "auto"};

  & svg {
    border: ${(props) =>
      props.$authorized && props.$voted ? "2px solid #8f1209" : "none"};
    border-radius: 50%;
    height: 100%;
    width: auto;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    transform: ${(props) =>
      props.$authorized && props.$canVote ? "scale(150%)" : "none"};
  }
`;

const HintDescription = styled.p`
  grid-column: 1 / -1;
  padding-bottom: 1.8rem;
`;

const SubmittedByContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
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

export {
  StyledHintItem,
  NavLinkContainer,
  HintDescription,
  Upvote,
  Downvote,
  HintTag,
  HintTagsContainer,
  SubmittedByContainer,
  UserAvatar,
  UserName,
  HintDeleteButton,
  HintActionsContainer,
};
