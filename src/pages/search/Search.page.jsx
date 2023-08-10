import { useState } from "react";

import SearchInput from "../../features/search/search-input/SearchInput.component";
import SearchResultsGrid from "../../features/search/search-results-grid/SearchResultsGrid.component";

import { StyledSearch } from "./Search.styles";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <StyledSearch>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {searchQuery.length > 2 && (
        <SearchResultsGrid searchQuery={searchQuery} />
      )}
    </StyledSearch>
  );
}

export default Search;
