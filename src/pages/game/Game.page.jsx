import GameDetails from "../../features/game/game-details/GameDetails.component";
import HintListSection from "../../features/hint/hint-list/HintList.component";
import { StyledGame } from "./Game.styles";
import { useQueryClient } from "@tanstack/react-query";

function Game() {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: ["games"],
  });
  queryClient.invalidateQueries({
    queryKey: ["hints"],
  });

  return (
    <StyledGame>
      <GameDetails />
      <HintListSection />
    </StyledGame>
  );
}

export default Game;
