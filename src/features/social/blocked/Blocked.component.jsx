import { BlockedHeading, BlockedImage, StyledBlocked } from "./Blocked.styles";
import { ImBlocked } from "react-icons/im";

function Blocked() {
  return (
    <StyledBlocked>
      <BlockedHeading>Blocked</BlockedHeading>
      <BlockedImage>
        <ImBlocked />
      </BlockedImage>
    </StyledBlocked>
  );
}

export default Blocked;
