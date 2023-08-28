import { styled } from "styled-components";

const StyledVotes = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

const VoteContainer = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const VoteCount = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-brand-700);
`;

const VoteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background-color: transparent;

  cursor: ${(props) => !props.$canVote && "auto"};

  &:focus {
    outline: none;
  }

  & svg {
    transition: all 0.3s;

    transform: scale(150%);

    color: ${(props) =>
      props.$canVote ? "var(--color-brand-700)" : "var(--color-brand-600)"};
    fill: ${(props) =>
      props.$canVote && props.$voted ? "var(--color-brand-200)" : "none"};
  }

  &:hover {
    & svg {
      transform: ${(props) =>
        props.$canVote && !props.$votesLoading && "scale(175%)"};
    }
  }

  &:active {
    & svg {
      transform: ${(props) =>
        props.$canVote && !props.$votesLoading && "scale(200%)"};
    }
  }
`;

export { StyledVotes, VoteContainer, VoteButton, VoteCount };
