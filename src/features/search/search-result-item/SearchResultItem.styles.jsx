import { styled } from "styled-components";

const StyledSearchResultItem = styled.button`
  display: grid;
  grid-template-columns: 1.5fr 3fr;
  gap: 2rem;
  justify-content: center;
  align-items: start;
  height: 25rem;

  border-radius: 5px;
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
`;

const SearchResultItemDescription = styled.p`
  margin-top: 3rem;
  font-size: 1.25rem;
  color: var(--color-brand-700);
`;

const SearchResultItemImage = styled.img`
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: double 7px rgba(34, 34, 34, 0.5);
  align-self: center;

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
