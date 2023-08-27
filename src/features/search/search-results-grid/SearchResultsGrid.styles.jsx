import { styled } from "styled-components";

const StyledSearchResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3rem;
  max-width: 80%;
  padding-bottom: 5rem;

  @media (max-width: 140em) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 120em) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 100em) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 60em) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 45em) {
    display: flex;
    flex-direction: column;
  }
`;

const SearchResultsDivider = styled.div`
  width: 80%;
  height: 3px;
  background-color: rgba(34, 34, 34, 0.1);
  margin-bottom: 5rem;
`;

const NoResults = styled.p`
  color: #aaa;
  text-align: center;
  font-size: 6rem;
  text-transform: capitalize;
`;

export { StyledSearchResultsGrid, NoResults, SearchResultsDivider };
