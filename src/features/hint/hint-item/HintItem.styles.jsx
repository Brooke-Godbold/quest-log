import { styled } from "styled-components";

const StyledHintItem = styled.div`
  padding: 1.5rem 2.5rem;
  background-color: var(--color-brand-600);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 0.5rem;
  transition: all 0.3s;

  box-shadow: 0 0 6px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: var(--color-brand-500);
  }

  @media (max-width: 30em) {
    display: flex;
    flex-direction: column;
  }
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

const HintDeleteButton = styled.button`
  border: none;
  background-color: transparent;
  margin-right: 2rem;

  & svg {
    transform: scale(120%);
    color: var(--color-red-800);
  }

  & svg:hover {
    color: var(--color-red-600);
  }
`;

const HintUpvotes = styled.div`
  display: flex;
  gap: 1rem;
  justify-self: right;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
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
  HintDescription,
  HintUpvotes,
  Upvote,
  Downvote,
  HintTag,
  HintTagsContainer,
  SubmittedByContainer,
  UserAvatar,
  UserName,
  HintDeleteButton,
};
