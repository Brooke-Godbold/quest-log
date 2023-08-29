import PropTypes from "prop-types";

import { StyledHintListSection } from "./HintList.styles";
import HintListHeader from "./HintListHeader.component";

import HintListBody from "./HintListBody.component";

function HintListSection({ detailsActive }) {
  return (
    <StyledHintListSection $detailsActive={detailsActive}>
      <HintListHeader />
      <HintListBody />
    </StyledHintListSection>
  );
}

HintListSection.propTypes = {
  detailsActive: PropTypes.bool.isRequired,
};

export default HintListSection;
