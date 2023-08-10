import { styled } from "styled-components";

const StyledHintItem = styled.div`
  padding: 1.5rem 2.5rem;
  background-color: #aaa;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 0.5rem;
  transition: all 0.3s;

  &:hover {
    background-color: #999;
  }
`;

const HintTagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  grid-column: 1 / -1;
`;

const HintTag = styled.div`
  background-color: #666;
  color: #bbb;
  border-radius: 4px;
  padding: 0.25rem 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.25rem;
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
  color: green;
  transition: all 0.3s;
  border: none;
  background-color: transparent;

  &:focus {
    outline: none;
  }

  &:focus,
  &:hover {
    transform: scale(150%);
  }
`;

const Downvote = styled.button`
  color: red;
  transition: all 0.3s;
  border: none;
  background-color: transparent;

  &:focus {
    outline: none;
  }

  &:focus,
  &:hover {
    transform: scale(150%);
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
  width: auto;
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
};
