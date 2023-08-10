import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Spinner from "../../../ui/spinner/Spinner";
import HintItem from "../hint-item/HintItem.component";
import { StyledHintListSection, HintList, NoHints } from "./HintList.styles";

import { useHint } from "./useHint";
import NewHint from "../new-hint/NewHint.component";
import { getVotes } from "../../../services/apiVotes";

function HintListSection({ isNewHint, setIsNewHint }) {
  const { id } = useParams();
  const { isLoading, hintData } = useHint(id);

  const [isSorting, setIsSorting] = useState(true);
  const [sortedHints, setSortedHints] = useState([]);

  useEffect(
    function () {
      if (!hintData || !isSorting) return;

      const populateHints = async () => {
        const newArr = await Promise.all(
          hintData.map(async (hint) => {
            const votes = await getVotes(hint.id);
            const upvotes = votes.reduce(
              (acc, vote) => (vote.isPositive ? acc + 1 : acc),
              0
            );
            const downvotes = votes.reduce(
              (acc, vote) => (!vote.isPositive ? acc + 1 : acc),
              0
            );
            const fullHintData = { ...hint, upvotes, downvotes };

            return fullHintData;
          })
        );

        newArr.sort((a, b) => {
          return b.upvotes - b.downvotes - (a.upvotes - a.downvotes);
        });

        setSortedHints(newArr);
        setIsSorting(false);
      };

      populateHints();
    },
    [hintData, isSorting]
  );

  return (
    <StyledHintListSection>
      <HintList>
        {isNewHint && <NewHint setIsNewHint={setIsNewHint} />}
        {isLoading || !hintData ? (
          <Spinner />
        ) : hintData.length === 0 ? (
          !isNewHint ? (
            <NoHints>Nothing here yet...</NoHints>
          ) : null
        ) : (
          sortedHints.map((hint) => (
            <HintItem hint={hint} key={hint.id} setIsSorting={setIsSorting} />
          ))
        )}
      </HintList>
    </StyledHintListSection>
  );
}

HintListSection.propTypes = {
  isNewHint: PropTypes.bool.isRequired,
  setIsNewHint: PropTypes.func.isRequired,
};

export default HintListSection;
