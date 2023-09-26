import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { compareDesc } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';

import { usePostByUser } from '../../../query/post/usePostByUser';
import { useHint } from '../../../query/hint/useHint';
import { useUser } from '../../../query/auth/useUser';
import { useAllGames } from '../../../query/game/useAllGames';
import { useReplyByPostId } from '../../../query/post/useReplyByPostId';
import { usePostById } from '../../../query/post/usePostById';
import { useAllPosts } from '../../../query/post/useAllPosts';
import { useProfileByUser } from '../../../query/profile/useProfileByUser';
import { useProfilesByUsername } from '../../../query/profile/useProfilesByUsername';

import { BiTime } from 'react-icons/bi';
import { BsPeopleFill, BsPersonFillCheck } from 'react-icons/bs';
import { TbWorldSearch } from 'react-icons/tb';
import { GrGamepad } from 'react-icons/gr';
import { RiFileList3Line } from 'react-icons/ri';

import Spinner from '../../../ui/spinner/Spinner';
import Blocked from '../blocked/Blocked.component';
import PostList from '../post-list/PostList.component';
import Hints from '../../hint/hints/Hints.component';
import ReplyList from '../reply-list/ReplyList.component';
import SearchResultList from '../../search/search-result-list/SearchResultList.component';

import {
  SocialFeedButton,
  SocialFeedButtons,
  SocialFeedContent,
  StyledSocialFeedContainer,
} from './SocialFeedContainer.styles';
import { GameSelect } from '../../../ui/game-select/GameSelect.styles';
import { ResponsiveButtonContent } from '../../../ui/responsive-button-content/ResponsiveButtonContent.styles';

import { useSearch } from '../../../hooks/useSearch';
import { useScrollToItem } from '../../../hooks/useScrollToItem';
import { useIsBlocked } from '../../../hooks/useIsBlocked';

function SocialFeedContainer() {
  const { username, postId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { isAuthenticated, user } = useUser();
  const { profile: viewedProfile } = useProfilesByUsername(username);
  const userId = viewedProfile?.userId;

  const queryClient = useQueryClient();

  const [uniqueGames, setUniqueGames] = useState([]);

  const {
    gameData,
    isLoading: isGettingGames,
    isError: isGamesError,
  } = useAllGames();

  const {
    posts: userPosts,
    isGettingPosts,
    isError: isPostError,
  } = usePostByUser(userId);

  const { posts: allPosts } = useAllPosts();

  const {
    hintData,
    isLoading: isGettingHints,
    isFetching: isFetchingHints,
    isError: isHintError,
  } = useHint({
    by: 'userId',
    id: userId,
  });

  const { searchResults } = useSearch(searchParams.get('search'));

  const { post, isGettingPost, isError: isPostIdError } = usePostById(postId);

  const { profile } = useProfileByUser(user?.id);

  const { isBlocked } = useIsBlocked(postId ? post?.userId : userId, user?.id);

  const {
    replies,
    isGettingReplies,
    isError: isRepliesError,
  } = useReplyByPostId(post?.id);

  const isLoadingReplies =
    isGettingPost || isPostIdError || isGettingReplies || isRepliesError;
  const isLoadingHints = isGettingHints || isFetchingHints || isHintError;
  const isLoadingPosts = isGettingPosts || isPostError;
  const isLoadingGames = isGettingGames || isGamesError;

  function setView(view) {
    queryClient.invalidateQueries({ queryKey: ['post'] });

    searchParams.set('view', view);
    searchParams.delete('search');
    setSearchParams(searchParams, { replace: true });
  }

  const sortedPosts = useMemo(() => {
    if (!allPosts && !userPosts && !replies) return;

    switch (searchParams.get('view')) {
      case 'trending':
        if (!allPosts) break;
        return [
          ...allPosts.sort(
            (postA, postB) =>
              postB.upvotes.length -
              postB.downvotes.length -
              (postA.upvotes.length - postA.downvotes.length)
          ),
        ];

      case 'following':
        if (!profile || !allPosts) break;
        return [
          ...allPosts
            .filter((post) => profile.following.includes(post.userId))
            .sort((postA, postB) =>
              compareDesc(
                new Date(postA.created_at),
                new Date(postB.created_at)
              )
            ),
        ];

      case 'discover':
        if (!profile || !allPosts) break;
        return [
          ...allPosts
            .filter(
              (post) =>
                profile.currentGames.includes(post.gameId) &&
                !profile.following.includes(post.userId) &&
                post.userId !== user?.id
            )
            .sort((postA, postB) =>
              compareDesc(
                new Date(postA.created_at),
                new Date(postB.created_at)
              )
            ),
        ];

      case 'playing':
        if (!profile || !allPosts) break;
        console.log(profile.currentGames);
        return allPosts;

      case 'posts':
        if (!userPosts) break;
        return [
          ...userPosts
            .sort((postA, postB) =>
              compareDesc(
                new Date(postA.created_at),
                new Date(postB.created_at)
              )
            )
            .filter((post) =>
              searchParams.get('game')
                ? post.gameId === Number(searchParams.get('game'))
                : post
            ),
        ];

      case 'hints':
        if (!hintData) break;
        return [
          ...hintData.filter((hint) =>
            searchParams.get('game')
              ? hint.gameId === Number(searchParams.get('game'))
              : hint
          ),
        ];

      case 'popular':
        if (!replies) break;
        return [
          ...replies.sort(
            (postA, postB) =>
              postB.upvotes.length -
              postB.downvotes.length -
              (postA.upvotes.length - postA.downvotes.length)
          ),
        ];

      case 'recent':
        if (!replies) break;
        return [
          ...replies.sort((postA, postB) =>
            compareDesc(new Date(postA.created_at), new Date(postB.created_at))
          ),
        ];
    }

    return [];
  }, [allPosts, searchParams, profile, userPosts, replies, hintData, user]);

  const canShowPosts =
    !isLoadingPosts && sortedPosts && !isLoadingGames && gameData;

  const canShowHints = !isLoadingHints && hintData;

  const canShowReplies = postId && !isLoadingReplies;

  useEffect(
    function () {
      if (
        (!searchParams.get('search') &&
          !isAuthenticated &&
          (searchParams.get('view') === 'following' ||
            searchParams.get('view') === 'discover')) ||
        (!searchParams.get('search') && !searchParams.get('view')) ||
        (searchParams.get('search') && searchParams.get('view'))
      ) {
        searchParams.delete('search');
        searchParams.set('view', 'trending');
        setSearchParams(searchParams, { replace: true });
      }
    },
    [isAuthenticated, searchParams, setSearchParams]
  );

  useEffect(() => {
    if (!username) return;

    if (
      searchParams.get('view') !== 'posts' &&
      searchParams.get('view') !== 'hints'
    ) {
      searchParams.set('view', 'posts');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, username, setSearchParams]);

  useEffect(() => {
    if (
      searchParams.get('view') !== 'posts' &&
      searchParams.get('view') !== 'hints'
    )
      return;

    let items;

    if (searchParams.get('view') === 'posts') items = userPosts;
    else if (searchParams.get('view') === 'hints') items = hintData;

    if (!items) return;

    const gameIds = items.reduce((acc, cur) => {
      acc.push(cur.gameId);
      return acc;
    }, []);
    const gameIdsFiltered = gameIds.filter((game) => game);
    setUniqueGames([...new Set(gameIdsFiltered)]);
  }, [searchParams, userPosts, hintData]);

  useScrollToItem([userPosts, hintData, replies]);

  function setGameFilter(e) {
    e.target.value >= 0
      ? searchParams.set('game', e.target.value)
      : searchParams.delete('game');
    setSearchParams(searchParams, { replace: true });
  }

  const TopScrollElement = () => {
    const elementRef = useRef();

    useEffect(() => elementRef.current.scrollIntoView());

    return <div ref={elementRef} />;
  };

  return (
    <>
      {(postId || userId) && isBlocked ? (
        <Blocked />
      ) : (
        <StyledSocialFeedContainer>
          <SocialFeedButtons>
            {userId ? (
              <>
                <SocialFeedButton
                  $active={searchParams.get('view') === 'posts'}
                  onClick={() => setView('posts')}
                >
                  <ResponsiveButtonContent>
                    <p>Posts</p>
                    <RiFileList3Line />
                  </ResponsiveButtonContent>
                </SocialFeedButton>
                <GameSelect
                  value={searchParams.get('game') || -1}
                  onChange={setGameFilter}
                >
                  <option key={'none'} value={-1}>
                    All Games
                  </option>
                  {gameData &&
                    uniqueGames.map((id) => {
                      const game = gameData.find((game) => game.id === id);
                      return (
                        <option key={game.id} value={game.id}>
                          {game.name}
                        </option>
                      );
                    })}
                </GameSelect>
                <SocialFeedButton
                  $active={searchParams.get('view') === 'hints'}
                  onClick={() => setView('hints')}
                >
                  <ResponsiveButtonContent>
                    <p>Hints</p>
                    <GrGamepad />
                  </ResponsiveButtonContent>
                </SocialFeedButton>
              </>
            ) : postId ? (
              <>
                <SocialFeedButton
                  $active={searchParams.get('view') === 'recent'}
                  onClick={() => setView('recent')}
                >
                  <ResponsiveButtonContent>
                    <p>Recent</p>
                    <BiTime />
                  </ResponsiveButtonContent>
                </SocialFeedButton>
                <SocialFeedButton
                  $active={searchParams.get('view') === 'popular'}
                  onClick={() => setView('popular')}
                >
                  <ResponsiveButtonContent>
                    <p>Popular</p>
                    <BsPeopleFill />
                  </ResponsiveButtonContent>
                </SocialFeedButton>
              </>
            ) : isAuthenticated ? (
              <>
                <SocialFeedButton
                  $active={searchParams.get('view') === 'trending'}
                  onClick={() => setView('trending')}
                >
                  <ResponsiveButtonContent>
                    <p>Trending</p>
                    <BsPeopleFill />
                  </ResponsiveButtonContent>
                </SocialFeedButton>
                <SocialFeedButton
                  $active={searchParams.get('view') === 'following'}
                  onClick={() => setView('following')}
                >
                  <ResponsiveButtonContent>
                    <p>Following</p>
                    <BsPersonFillCheck />
                  </ResponsiveButtonContent>
                </SocialFeedButton>
                <SocialFeedButton
                  $active={searchParams.get('view') === 'discover'}
                  onClick={() => setView('discover')}
                >
                  <ResponsiveButtonContent>
                    <p>Discover</p>
                    <TbWorldSearch />
                  </ResponsiveButtonContent>
                </SocialFeedButton>
                <SocialFeedButton
                  $active={searchParams.get('view') === 'playing'}
                  onClick={() => setView('playing')}
                >
                  <ResponsiveButtonContent>
                    <p>Hints</p>
                    <GrGamepad />
                  </ResponsiveButtonContent>
                </SocialFeedButton>
              </>
            ) : null}
          </SocialFeedButtons>
          <SocialFeedContent>
            <TopScrollElement />
            {searchParams.get('search') && searchResults ? (
              <SearchResultList
                searchResultObject={searchResults}
                gameData={gameData}
              />
            ) : canShowReplies ? (
              <ReplyList replies={sortedPosts} gameData={gameData} />
            ) : searchParams.get('view') === 'hints' ? (
              canShowHints && <Hints hints={sortedPosts} user={user} />
            ) : canShowPosts ? (
              <PostList posts={sortedPosts} gameData={gameData} />
            ) : (
              <Spinner />
            )}
          </SocialFeedContent>
        </StyledSocialFeedContainer>
      )}
    </>
  );
}

export default SocialFeedContainer;
