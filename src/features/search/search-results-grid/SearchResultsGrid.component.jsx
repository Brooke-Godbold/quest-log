import PropTypes from "prop-types";

import { NoResults, StyledSearchResultsGrid } from "./SearchResultsGrid.styles";

import SearchResultItem from "../search-result-item/SearchResultItem.component";
import Spinner from "../../../ui/spinner/Spinner";

import { useSearchGames } from "./useSearchGames";

function SearchResultsGrid({ searchQuery }) {
  const { gameData } = useSearchGames(searchQuery);

  if (!gameData) return <Spinner />;

  return (
    <>
      {gameData.length === 0 ? (
        <NoResults>No matching results...</NoResults>
      ) : (
        <StyledSearchResultsGrid>
          {gameData.map((gameItem) => (
            <SearchResultItem gameItem={gameItem} key={gameItem.id} />
          ))}
        </StyledSearchResultsGrid>
      )}
    </>
  );
}

SearchResultsGrid.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default SearchResultsGrid;
