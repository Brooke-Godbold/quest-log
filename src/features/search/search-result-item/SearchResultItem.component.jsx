import PropTypes from "prop-types";
import {
  StyledSearchResultItem,
  SearchResultItemInformation,
  SearchResultItemName,
  SearchResultItemReleaseYear,
  SearchResultItemDescription,
  SearchResultItemImage,
} from "./SearchResultItem.styles";
import { useNavigate } from "react-router-dom";

function SearchResultItem({ gameItem }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/game/${gameItem.id}`);
  }

  return (
    <StyledSearchResultItem onClick={handleClick}>
      <SearchResultItemImage src={gameItem.imageUrl} />
      <SearchResultItemInformation>
        <SearchResultItemName>{gameItem.name}</SearchResultItemName>
        <SearchResultItemReleaseYear>
          {gameItem.releaseYear}
        </SearchResultItemReleaseYear>
        <SearchResultItemDescription>
          {gameItem.description}
        </SearchResultItemDescription>
      </SearchResultItemInformation>
    </StyledSearchResultItem>
  );
}

SearchResultItem.propTypes = {
  gameItem: PropTypes.object.isRequired,
};

export default SearchResultItem;
