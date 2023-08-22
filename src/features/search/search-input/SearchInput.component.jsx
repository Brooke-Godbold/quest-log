import { StyledSearchInput, Input } from "./SearchInput.styles";
import { useSearchParams } from "react-router-dom";

function SearchInput() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <StyledSearchInput>
      <Input
        placeholder="query..."
        value={searchParams.get("query") || ""}
        onChange={(e) => {
          searchParams.set("query", e.target.value);
          setSearchParams(searchParams);
        }}
      />
    </StyledSearchInput>
  );
}

export default SearchInput;
