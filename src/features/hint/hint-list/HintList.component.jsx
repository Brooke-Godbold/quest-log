import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import Spinner from "../../../ui/spinner/Spinner";
import HintItem from "../hint-item/HintItem.component";
import {
  StyledHintListSection,
  HintList,
  NoHints,
  HintListOverlay,
} from "./HintList.styles";

import { useHint } from "./useHint";
import NewHint from "../new-hint/NewHint.component";
import { useEffect, useRef } from "react";

function HintListSection({ isNewHint, setIsNewHint }) {
  const { id } = useParams();
  const { isLoading, isFetching, hintData } = useHint(id);

  const currentHint = useRef(0);

  function setCurrentHint(current) {
    currentHint.current = current;
  }

  useEffect(
    function () {
      const currentHintElement = document.getElementById(
        `hint_${currentHint.current}`
      );

      console.log(currentHintElement);

      if (!currentHintElement) return;

      currentHintElement.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center",
      });
    },
    [hintData]
  );

  return (
    <StyledHintListSection>
      <HintList scrollEnabled={!isNewHint}>
        {isNewHint && <HintListOverlay />}
        {isNewHint && <NewHint setIsNewHint={setIsNewHint} />}
        {isLoading || isFetching || !hintData ? (
          <Spinner />
        ) : hintData.length === 0 ? (
          !isNewHint ? (
            <NoHints>Nothing here yet...</NoHints>
          ) : null
        ) : (
          hintData.map((hint) => (
            <HintItem
              hint={hint}
              key={hint.id}
              id={`hint_${hint.id}`}
              currentHint={currentHint}
              setCurrentHint={setCurrentHint}
              isNewHint={isNewHint}
            />
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
