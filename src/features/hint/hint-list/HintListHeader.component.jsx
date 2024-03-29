import { useParams, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useMediaQuery } from '@uidotdev/usehooks';

import { HiX } from 'react-icons/hi';

import { useUser } from '../../../query/auth/useUser';
import { useAllGames } from '../../../query/game/useAllGames';

import Button from '../../../ui/button/Button.component';
import ToggleButton from '../../../ui/toggle-button/ToggleButton.component';
import NewHint from '../new-hint/NewHint.component';
import Modal from '../../../ui/modal/Modal.component';
import AddPostForm from '../../social/add-post-form/AddPostForm.component';

import { StyledButtonContainer } from '../../../ui/button-container/ButtonContainer.styles';
import {
  ButtonContainer,
  HintHeaderFilterSection,
  ResetUserButton,
  StyledHintListHeader,
  UserSearch,
  UserSearchInput,
} from './HintList.styles';
import { GameSelect } from '../../../ui/game-select/GameSelect.styles';

import { TAGS } from '../../../data/consts';

function HintListHeader() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get('sort') || 'popularity';
  const currentFilter = searchParams.get('filter') || 'none';

  const { register, handleSubmit, reset } = useForm();

  const { isAuthenticated, user } = useUser();

  const { gameData } = useAllGames();

  const isSmallDevice = useMediaQuery('only screen and (max-width : 90em)');

  function handleSetSort(toggleValue) {
    if (searchParams.get('sort') === toggleValue) return;

    searchParams.set('sort', toggleValue);
    setSearchParams(searchParams, { replace: true });
  }

  function handleSetFilter(toggleValue) {
    if (searchParams.get('filter') === toggleValue) return;

    searchParams.set('filter', toggleValue);
    setSearchParams(searchParams, { replace: true });
  }

  function handleSearchUsername(data) {
    searchParams.set('username', data.username);
    setSearchParams(searchParams, { replace: true });

    reset();
  }

  function resetSearchUsername() {
    searchParams.delete('username');
    setSearchParams(searchParams, { replace: true });
  }

  function handleSearchTags(e) {
    e.target.value === 'None'
      ? searchParams.delete('tag')
      : searchParams.set('tag', e.target.value);

    setSearchParams(searchParams, { replace: true });
  }

  useEffect(() => {
    if (!searchParams.get('view')) {
      searchParams.set('view', 'hints');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <StyledHintListHeader>
      <ButtonContainer>
        <HintHeaderFilterSection $width={30}>
          {isAuthenticated && (
            <div>
              {searchParams.get('view') === 'posts' ? (
                <Modal>
                  <Modal.Open opens="newPost">
                    <Button isLight={false}>New</Button>
                  </Modal.Open>
                  <Modal.Window name="newPost">
                    <AddPostForm
                      gameData={gameData}
                      currentGames={[Number(id)]}
                      userId={user.id}
                    />
                  </Modal.Window>
                </Modal>
              ) : (
                gameData?.find((game) => game.id === Number(id)).isReleased && (
                  <Modal>
                    <Modal.Open opens="newHint">
                      <Button isLight={false}>New</Button>
                    </Modal.Open>
                    <Modal.Window name="newHint">
                      <NewHint user={user} />
                    </Modal.Window>
                  </Modal>
                )
              )}
            </div>
          )}

          <UserSearch onSubmit={handleSubmit(handleSearchUsername)}>
            <UserSearchInput
              {...register('username', { required: true })}
              placeholder={
                searchParams.get('username') || 'Search by username...'
              }
            />
            <ResetUserButton onClick={resetSearchUsername}>
              <HiX />
            </ResetUserButton>
          </UserSearch>
        </HintHeaderFilterSection>

        <HintHeaderFilterSection $width={70}>
          {isSmallDevice ? (
            <GameSelect onChange={(e) => handleSetSort(e.target.value)}>
              <option value="popularity">Popular</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </GameSelect>
          ) : (
            <StyledButtonContainer>
              <ToggleButton
                toggleValue="popularity"
                currentToggleValue={currentSort}
                toggleFunction={handleSetSort}
              >
                Popular
              </ToggleButton>
              <ToggleButton
                toggleValue="newest"
                currentToggleValue={currentSort}
                toggleFunction={handleSetSort}
              >
                Newest
              </ToggleButton>
              <ToggleButton
                toggleValue="oldest"
                currentToggleValue={currentSort}
                toggleFunction={handleSetSort}
              >
                Oldest
              </ToggleButton>
            </StyledButtonContainer>
          )}

          {isSmallDevice ? (
            <GameSelect onChange={(e) => handleSetFilter(e.target.value)}>
              <option value="none">All</option>
              <option value="positive">Positive</option>
              <option value="sixMonths">Recent</option>
              <option value="mine">Owned</option>
            </GameSelect>
          ) : (
            <StyledButtonContainer>
              <ToggleButton
                toggleValue="none"
                currentToggleValue={currentFilter}
                toggleFunction={handleSetFilter}
              >
                All
              </ToggleButton>
              <ToggleButton
                toggleValue="positive"
                currentToggleValue={currentFilter}
                toggleFunction={handleSetFilter}
              >
                Positive
              </ToggleButton>
              <ToggleButton
                toggleValue="sixMonths"
                currentToggleValue={currentFilter}
                toggleFunction={handleSetFilter}
              >
                Recent
              </ToggleButton>
              {isAuthenticated && (
                <ToggleButton
                  toggleValue="mine"
                  currentToggleValue={currentFilter}
                  toggleFunction={handleSetFilter}
                >
                  Owned
                </ToggleButton>
              )}
            </StyledButtonContainer>
          )}

          {searchParams.get('view') !== 'posts' && (
            <GameSelect onChange={handleSearchTags}>
              <option value="None">All</option>
              {TAGS.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </GameSelect>
          )}
        </HintHeaderFilterSection>
      </ButtonContainer>
    </StyledHintListHeader>
  );
}

export default HintListHeader;
