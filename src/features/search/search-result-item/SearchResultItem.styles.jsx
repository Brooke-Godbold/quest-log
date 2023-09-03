import { styled } from "styled-components";
import { CommonItem } from "../../../styles/GlobalStyles";

const StyledSearchResultItem = styled.div`
  ${CommonItem}
`;

const SearchResultItemDescription = styled.p`
  margin-top: 3rem;
  font-size: 1.25rem;
  color: var(--color-brand-700);
`;

export { StyledSearchResultItem, SearchResultItemDescription };
