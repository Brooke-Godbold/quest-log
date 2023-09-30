import { useEffect, useState } from 'react';

import { useSearchGames } from '../query/game/useSearchGames';
import { usePostsByContent } from '../query/post/usePostsByContent';
import { usePostsByGames } from '../query/post/usePostByGame';
import { useProfilesByLikeUsername } from '../query/profile/useProfilesByLikeUsername';

export function useSearch(searchQuery) {
  const [searchResults, setSearchResults] = useState({});

  const { gameData } = useSearchGames(searchQuery);
  const { profiles } = useProfilesByLikeUsername(searchQuery);
  const { posts: postsByContent } = usePostsByContent(searchQuery);

  const gameIds = gameData?.reduce((arr, cur) => [...arr, cur.id], []);
  const { posts: postsByGames } = usePostsByGames(gameIds);

  useEffect(() => {
    function handleSearch() {
      setSearchResults({
        gameResults: gameData?.filter((game) => game.isVisible),
        profileResults: profiles,
        postResults: uniqueArray([
          ...(postsByContent || []),
          ...(postsByGames || []),
        ]),
      });
    }

    handleSearch();
  }, [searchQuery, gameData, profiles, postsByContent, postsByGames]);

  return { searchResults };
}

const uniqueArray = (arr) =>
  arr.filter(
    (value, index, self) => index === self.findIndex((t) => t.id === value.id)
  );
