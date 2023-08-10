import { useState } from "react";
import GameDetails from "../../features/game/game-details/GameDetails.component";
import HintListSection from "../../features/hint/hint-list/HintList.component";
import { StyledGame } from "./Game.styles";

function Game() {
  const [isNewHint, setIsNewHint] = useState(false);

  function handleAddNewHint() {
    setIsNewHint((isNewHint) => !isNewHint);
  }

  return (
    <StyledGame>
      <GameDetails handleAddHint={handleAddNewHint} />
      <HintListSection isNewHint={isNewHint} setIsNewHint={setIsNewHint} />
    </StyledGame>
  );
}

export default Game;
