import PropTypes from "prop-types";

import {
  SearchResultItemDescription,
  StyledSearchResultItem,
} from "./SearchResultItem.styles";
import AvatarNavLink from "../../../ui/avatar-nav-link/AvatarNavLink.component";

function SearchResultItem({ userId, gameData, description }) {
  return (
    <StyledSearchResultItem>
      <AvatarNavLink userId={userId} gameData={gameData} />
      <SearchResultItemDescription>{description}</SearchResultItemDescription>
    </StyledSearchResultItem>
  );
}

SearchResultItem.propTypes = {
  userId: PropTypes.string,
  gameData: PropTypes.object,
  description: PropTypes.string,
};

export default SearchResultItem;
