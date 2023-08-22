import { styled } from "styled-components";

const StyledSearchResultItem = styled.button`
  display: grid;
  grid-template-columns: 1.5fr 3.5fr;
  gap: 2rem;
  justify-content: center;
  align-items: center;

  background-color: var(--color-brand-400);
  padding: 3rem;
  box-shadow: inset 0rem 0rem 0.5rem rgb(17, 17, 17, 0.2);
  border: none;
  text-align: left;
  transition: all 0.3s;

  &:hover,
  &:active {
    background-color: var(--color-brand-500);
  }

  @media (max-width: 75em) {
    display: flex;
  }
`;

const SearchResultItemInformation = styled.div``;

const SearchResultItemName = styled.h3`
  color: var(--color-brand-800);
  margin-bottom: 0.25rem;
`;

const SearchResultItemReleaseYear = styled.h4`
  color: var(--color-brand-700);
  margin-bottom: 3rem;
`;

const SearchResultItemDescription = styled.p`
  font-size: 1.25rem;
  color: var(--color-brand-700);
`;

const SearchResultItemImage = styled.img`
  @media (max-width: 75em) {
    display: none;
  }
`;

export {
  StyledSearchResultItem,
  SearchResultItemInformation,
  SearchResultItemName,
  SearchResultItemReleaseYear,
  SearchResultItemDescription,
  SearchResultItemImage,
};
