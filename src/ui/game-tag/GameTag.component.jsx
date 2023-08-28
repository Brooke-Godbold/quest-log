import PropTypes from "prop-types";
import { PostGameTag, PostGameTagContainer } from "./GameTag.styles";

function GameTag({ to, children }) {
  return (
    <PostGameTagContainer>
      <PostGameTag to={to}>{children}</PostGameTag>
    </PostGameTagContainer>
  );
}

GameTag.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default GameTag;
