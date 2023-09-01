import PropTypes from "prop-types";

import { TbArrowBigUp, TbArrowBigDown } from "react-icons/tb";

import { useUpdatePost } from "../../query/post/useUpdatePost";
import { useUser } from "../../query/auth/useUser";
import { useUpdateHint } from "../../query/hint/useUpdateHint";

import {
  StyledVotes,
  VoteButton,
  VoteContainer,
  VoteCount,
} from "./Votes.styles";

function Votes({ itemId, updateItem, upvotes, downvotes, userId }) {
  const { isUpdatingPost } = useUpdatePost();
  const { isUpdatingHint } = useUpdateHint();

  const isLoading = isUpdatingPost || isUpdatingHint;

  const { isAuthenticated, user } = useUser();

  function vote(isUpvote) {
    if (!isAuthenticated || !user || isLoading || userId === user.id) return;

    if (isUpvote) {
      const newUpvotes = upvotes.includes(user.id)
        ? upvotes.filter((userId) => userId !== user.id)
        : [...upvotes, user.id];

      const newDownvotes = downvotes.includes(user.id)
        ? downvotes.filter((userId) => userId !== user.id)
        : downvotes;

      updateItem({
        by: "id",
        id: itemId,
        data: {
          upvotes: newUpvotes,
          downvotes: newDownvotes,
        },
      });
    } else {
      const newDownvotes = downvotes.includes(user.id)
        ? downvotes.filter((userId) => userId !== user.id)
        : [...downvotes, user.id];

      const newUpvotes = upvotes.includes(user.id)
        ? upvotes.filter((userId) => userId !== user.id)
        : upvotes;

      updateItem({
        by: "id",
        id: itemId,
        data: {
          upvotes: newUpvotes,
          downvotes: newDownvotes,
        },
      });
    }
  }

  return (
    <StyledVotes>
      <VoteContainer>
        <VoteCount>{upvotes.length}</VoteCount>
        <VoteButton
          $canVote={isAuthenticated && userId !== user?.id}
          $votesLoading={isLoading}
          $voted={upvotes.includes(user?.id)}
          onClick={() => vote(true)}
        >
          <TbArrowBigUp />
        </VoteButton>
      </VoteContainer>
      <VoteContainer>
        <VoteCount>{downvotes.length}</VoteCount>
        <VoteButton
          $canVote={isAuthenticated && userId !== user?.id}
          $votesLoading={isLoading}
          $voted={downvotes.includes(user?.id)}
          onClick={() => vote(false)}
        >
          <TbArrowBigDown />
        </VoteButton>
      </VoteContainer>
    </StyledVotes>
  );
}

Votes.propTypes = {
  upvotes: PropTypes.array.isRequired,
  downvotes: PropTypes.array.isRequired,
  itemId: PropTypes.number.isRequired,
  updateItem: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

export default Votes;
