import PropTypes from "prop-types";

import {
  SearchResultItemDescription,
  StyledSearchResultItem,
} from "./SearchResultItem.styles";
import AvatarNavLink from "../../../ui/avatar-nav-link/AvatarNavLink.component";

function SearchResultItem({ userId, gameData, description, innerRef }) {
  return (
    <StyledSearchResultItem ref={innerRef}>
      <AvatarNavLink userId={userId} gameData={gameData} />
      <SearchResultItemDescription>{description}</SearchResultItemDescription>
    </StyledSearchResultItem>
  );
}

SearchResultItem.propTypes = {
  userId: PropTypes.string,
  gameData: PropTypes.object,
  description: PropTypes.string,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default SearchResultItem;
