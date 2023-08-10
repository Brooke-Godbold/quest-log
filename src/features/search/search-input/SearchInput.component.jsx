import PropTypes from "prop-types";

import { StyledSearchInput, Input } from "./SearchInput.styles";

function SearchInput({ searchQuery, setSearchQuery }) {
  return (
    <StyledSearchInput>
      <Input
        placeholder="query..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </StyledSearchInput>
  );
}

SearchInput.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default SearchInput;
