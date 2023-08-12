import { useState } from "react";

import { StyledHintListSection } from "./HintList.styles";
import HintListHeader from "./HintListHeader.component";

import HintListBody from "./HintListBody.component";

function HintListSection() {
  const [isNewHint, setIsNewHint] = useState(false);

  return (
    <StyledHintListSection>
      <HintListHeader isNewHint={isNewHint} setIsNewHint={setIsNewHint} />
      <HintListBody isNewHint={isNewHint} />
    </StyledHintListSection>
  );
}

export default HintListSection;
