import { useEffect, useState } from "react";

import SearchInput from "../../features/search/search-input/SearchInput.component";
import SearchResultsGrid from "../../features/search/search-results-grid/SearchResultsGrid.component";

import { StyledSearch, TitleContainer, TitleImage } from "./Search.styles";
import { useSearchParams } from "react-router-dom";
import { supabaseStoragePath, supabaseUrl } from "../../services/supabase";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(
    function () {
      searchParams.get("query")
        ? setSearchQuery(searchParams.get("query"))
        : setSearchQuery("");
    },
    [searchParams]
  );

  return (
    <StyledSearch>
      {searchQuery.length <= 2 && (
        <TitleContainer>
          <TitleImage
            src={`${supabaseUrl}/${supabaseStoragePath}/brand/logo.png`}
          />
        </TitleContainer>
      )}
      <SearchInput />
      {searchQuery.length > 2 && (
        <SearchResultsGrid searchQuery={searchQuery} />
      )}
    </StyledSearch>
  );
}

export default Search;
