import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import GameDetails from "../../features/game/game-details/GameDetails.component";
import HintListSection from "../../features/hint/hint-list/HintList.component";
import SwitchViewContainer from "../../features/game/switch-view/SwitchViewContainer.component";

import { StyledGame } from "./Game.styles";

function Game() {
  const [detailsActive, setDetailsActive] = useState(true);

  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: ["games"],
  });
  queryClient.invalidateQueries({
    queryKey: ["hints"],
  });

  return (
    <StyledGame>
      <SwitchViewContainer
        detailsActive={detailsActive}
        setDetailsActive={setDetailsActive}
      />
      <GameDetails detailsActive={detailsActive} />
      <HintListSection detailsActive={detailsActive} />
    </StyledGame>
  );
}

export default Game;
