import { useEffect, useState } from "react";
import { useSearchGames } from "../query/game/useSearchGames";
import { useProfilesByUsername } from "../query/profile/useProfilesByUsername";
import { usePostsByContent } from "../query/post/usePostsByContent";

export function useSearch(searchQuery) {
  const [searchResults, setSearchResults] = useState({});

  const { gameData } = useSearchGames(searchQuery);
  const { profile: profiles } = useProfilesByUsername(searchQuery);
  const { posts } = usePostsByContent(searchQuery);

  useEffect(() => {
    function handleSearch() {
      setSearchResults({
        gameResults: gameData,
        profileResults: profiles,
        postResults: posts,
      });
    }

    handleSearch();
  }, [searchQuery, gameData, profiles, posts]);

  return { searchResults };
}
