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

const MAX_SUMMARY = 200;

function SearchResultItem({ to, imageUrl, title, year, summary }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(to);
  }

  return (
    <StyledSearchResultItem onClick={handleClick}>
      <SearchResultItemImage src={imageUrl} />
      <SearchResultItemInformation>
        <SearchResultItemName>{title}</SearchResultItemName>
        {year && (
          <SearchResultItemReleaseYear>{year}</SearchResultItemReleaseYear>
        )}
        <SearchResultItemDescription>
          {summary.length > MAX_SUMMARY
            ? `${summary.substring(0, MAX_SUMMARY)}...`
            : summary}
        </SearchResultItemDescription>
      </SearchResultItemInformation>
    </StyledSearchResultItem>
  );
}

SearchResultItem.propTypes = {
  to: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  year: PropTypes.string,
};

export default SearchResultItem;
