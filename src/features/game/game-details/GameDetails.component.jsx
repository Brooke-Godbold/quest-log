import PropTypes from 'prop-types';

import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { HiPlus, HiX } from 'react-icons/hi';

import { useGame } from '../../../query/game/useGame';
import { useUser } from '../../../query/auth/useUser';
import { useProfileByUser } from '../../../query/profile/useProfileByUser';
import { useProfilesByValues } from '../../../query/profile/useProfilesByValues';
import { useUpdateProfile } from '../../../query/profile/useUpdateProfile';

import Spinner, { MiniSpinner } from '../../../ui/spinner/Spinner';
import Button from '../../../ui/button/Button.component';
import Notification from '../../../ui/notification/Notification.component';

import {
  CurrentlyPlayingCount,
  GameButton,
  GameButtonsContainer,
  GameDetailsDescription,
  GameDetailsHeader,
  GameDetailsImage,
  GameDetailsImageContainer,
  GameDetailsInformation,
  GameDetailsReleaseYear,
  GameDetailsTitle,
  GamePlatformTag,
  GamePlatformTagContainer,
  StyledGameDetails,
} from './GameDetails.styles';

import { usePageTitle } from '../../../hooks/usePageTitle';

function GameDetails({ detailsActive }) {
  const { id } = useParams();
  const { gameData, isFetching } = useGame(id);

  const { user } = useUser();
  const { profile, isFetchingProfile } = useProfileByUser(user?.id);
  const { updateProfile, isLoading: isUpdatingProfile } = useUpdateProfile(
    user?.id,
    profile?.username
  );
  const {
    profiles: currentGamers,
    isFetchingProfiles: isFetchingCurrentGamers,
  } = useProfilesByValues({ column: 'currentGames', values: [gameData?.id] });

  usePageTitle(gameData?.name);

  function handleAddCurrentlyPlaying() {
    const currentGames = [...profile.currentGames, gameData.id];

    updateProfile(
      { userId: user.id, data: { currentGames } },
      {
        onSuccess: () =>
          toast(() => (
            <Notification
              text={`Successfully added ${gameData.name} to Currently Playing!`}
            />
          )),
        onError: () =>
          toast.error(() => (
            <Notification
              text={`Could not add ${gameData.name} to your Currently Playing List at this time`}
            />
          )),
      }
    );
  }

  function handleRemoveCurrentlyPlaying() {
    const currentGames = [
      ...profile.currentGames.filter((gameId) => gameId !== gameData.id),
    ];

    updateProfile(
      { userId: user.id, data: { currentGames } },
      {
        onSuccess: () =>
          toast(() => (
            <Notification
              text={`Successfully removed ${gameData.name} from Currently Playing!`}
            />
          )),
        onError: () =>
          toast.error(() => (
            <Notification
              text={`Could not remove ${gameData.name} from your Currently Playing List at this time`}
            />
          )),
      }
    );
  }

  return (
    <StyledGameDetails $detailsActive={detailsActive}>
      {!gameData || isFetching ? (
        <Spinner />
      ) : (
        <>
          <GameDetailsImageContainer>
            <GameDetailsImage src={gameData.imageUrl} />
          </GameDetailsImageContainer>
          <GameDetailsHeader>
            <GameDetailsTitle>{gameData.name}</GameDetailsTitle>
            <GameDetailsReleaseYear>
              {gameData.releaseYear}
            </GameDetailsReleaseYear>
            <GamePlatformTagContainer>
              {gameData.platforms.map((platform) => (
                <GamePlatformTag key={`${gameData.id}_${platform}`}>
                  {platform}
                </GamePlatformTag>
              ))}
            </GamePlatformTagContainer>
          </GameDetailsHeader>
          <GameDetailsInformation>
            <GameDetailsDescription>
              {gameData.description}
            </GameDetailsDescription>
            {gameData.publisherSite ? (
              <GameButtonsContainer>
                <Button
                  isLight={false}
                  isLink={true}
                  href={gameData.publisherSite}
                >
                  Visit Publisher
                </Button>
                {!isFetchingProfile && profile && gameData?.isReleased && (
                  <GameButton
                    disabled={
                      isFetchingProfile ||
                      isUpdatingProfile ||
                      (profile?.currentGames.length === 1 &&
                        profile?.currentGames.includes(gameData.id)) ||
                      (profile?.currentGames.length === 3 &&
                        !profile?.currentGames.includes(gameData.id))
                    }
                    onClick={
                      profile?.currentGames.includes(gameData.id)
                        ? handleRemoveCurrentlyPlaying
                        : handleAddCurrentlyPlaying
                    }
                    $isPlaying={profile?.currentGames.includes(gameData.id)}
                  >
                    {isFetchingProfile || isUpdatingProfile ? (
                      <MiniSpinner />
                    ) : profile.currentGames.includes(gameData.id) ? (
                      <>
                        Currently Playing <HiX />
                      </>
                    ) : (
                      <>
                        Start Playing <HiPlus />
                      </>
                    )}
                  </GameButton>
                )}
                {gameData?.isReleased && (
                  <CurrentlyPlayingCount>
                    {isFetchingCurrentGamers ? (
                      <MiniSpinner />
                    ) : (
                      <p>{`${currentGamers.length} Users currently playing!`}</p>
                    )}
                  </CurrentlyPlayingCount>
                )}
              </GameButtonsContainer>
            ) : null}
          </GameDetailsInformation>
        </>
      )}
    </StyledGameDetails>
  );
}

GameDetails.propTypes = {
  detailsActive: PropTypes.bool.isRequired,
};

export default GameDetails;
