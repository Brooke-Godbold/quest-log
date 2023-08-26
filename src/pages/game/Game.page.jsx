import { useState } from "react";
import GameDetails from "../../features/game/game-details/GameDetails.component";
import HintListSection from "../../features/hint/hint-list/HintList.component";
import { StyledGame } from "./Game.styles";
import { useQueryClient } from "@tanstack/react-query";
import SwitchViewContainer from "../../features/game/switch-view/SwitchViewContainer.component";

function Game() {
  const [detailsActive, setDetailsActive] = useState("both");

  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: ["games"],
  });
  queryClient.invalidateQueries({
    queryKey: ["hints"],
  });

  return (
    <StyledGame>
      <SwitchViewContainer setDetailsActive={setDetailsActive} />
      <GameDetails detailsActive={detailsActive} />
      <HintListSection detailsActive={detailsActive} />
    </StyledGame>
  );
}

export default Game;
