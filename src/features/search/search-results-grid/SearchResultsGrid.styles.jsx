import { styled } from "styled-components";

const StyledSearchResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  max-width: 80%;
`;

const NoResults = styled.p`
  color: #aaa;
  text-align: center;
  font-size: 6rem;
  text-transform: capitalize;
`;

export { StyledSearchResultsGrid, NoResults };
