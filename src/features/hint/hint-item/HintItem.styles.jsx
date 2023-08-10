import { styled } from "styled-components";

const StyledHintItem = styled.div`
  padding: 1.5rem 2.5rem;
  background-color: #aaa;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0.5rem;
  transition: all 0.3s;

  &:hover {
    background-color: #999;
  }
`;

const HintUpvotes = styled.div`
  display: flex;
  gap: 1rem;
  justify-self: right;
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

export { StyledHintItem, HintDescription, HintUpvotes, Upvote, Downvote };
