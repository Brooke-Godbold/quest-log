import PropTypes from "prop-types";

import {
  NoResults,
  SearchResultsDivider,
  StyledSearchResultsGrid,
} from "./SearchResultsGrid.styles";

import SearchResultItem from "../search-result-item/SearchResultItem.component";
import Spinner from "../../../ui/spinner/Spinner";

import { useSearchGames } from "./useSearchGames";
import { useProfilesByUsername } from "./useProfilesByUsername";

function SearchResultsGrid({ searchQuery }) {
  const {
    gameData,
    isLoading: isGettingGames,
    isError: isGamesError,
  } = useSearchGames(searchQuery);
  const {
    profile,
    isGettingProfile,
    isFetchingProfile,
    isError: isProfileError,
  } = useProfilesByUsername(searchQuery);

  const isLoading = isGettingGames || isGettingProfile || isFetchingProfile;
  const isError = isProfileError || isGamesError;

  if (isLoading) return <Spinner />;

  return (
    <>
      {isError ? (
        <NoResults>Oops, something went wrong...</NoResults>
      ) : gameData.length === 0 && profile.length === 0 ? (
        <NoResults>No matching results...</NoResults>
      ) : (
        <>
          <StyledSearchResultsGrid>
            {profile.map((profile) => (
              <SearchResultItem
                key={profile.userId}
                to={`/social/${profile.userId}`}
                imageUrl={profile.avatarUrl}
                title={profile.username}
                summary={profile.bio}
              />
            ))}
          </StyledSearchResultsGrid>
          {profile?.length > 0 && gameData?.length > 0 && (
            <SearchResultsDivider />
          )}
          <StyledSearchResultsGrid>
            {gameData.map((gameItem) => (
              <SearchResultItem
                key={gameItem.id}
                to={`/game/${gameItem.id}`}
                imageUrl={gameItem.imageUrl}
                title={gameItem.name}
                year={gameItem.releaseYear}
                summary={gameItem.summary}
              />
            ))}
          </StyledSearchResultsGrid>
        </>
      )}
    </>
  );
}

SearchResultsGrid.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

export default SearchResultsGrid;
