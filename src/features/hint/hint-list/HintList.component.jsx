import { useEffect, useState } from "react";

import { StyledHintListSection } from "./HintList.styles";
import HintListHeader from "./HintListHeader.component";

import HintListBody from "./HintListBody.component";
import { useUser } from "../../auth/useUser";

function HintListSection() {
  const [isNewHint, setIsNewHint] = useState(false);

  const { isAuthenticated } = useUser();

  useEffect(
    function () {
      if (!isAuthenticated) setIsNewHint(false);
    },
    [isAuthenticated]
  );

  return (
    <StyledHintListSection>
      <HintListHeader isNewHint={isNewHint} setIsNewHint={setIsNewHint} />
      <HintListBody isNewHint={isNewHint} />
    </StyledHintListSection>
  );
}

export default HintListSection;
