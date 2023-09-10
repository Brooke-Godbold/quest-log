import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useUser } from '../../../query/auth/useUser';
import { useProfileByUser } from '../../../query/profile/useProfileByUser';
import { useUpdateProfile } from '../../../query/profile/useUpdateProfile';
import { useAllGames } from '../../../query/game/useAllGames';

import { FaTwitch } from 'react-icons/fa';
import { GrYoutube } from 'react-icons/gr';
import { RiKickFill } from 'react-icons/ri';

import Spinner from '../../../ui/spinner/Spinner';
import CurrentlyPlayingRow from '../currently-playing-row/CurrentlyPlayingRow.component';
import TextCount from '../../../ui/text-count/TextCount.component';
import Notification from '../../../ui/notification/Notification.component';

import {
  AccountProfileBio,
  AccountSocialMediaContainer,
  AccountSocialMediaInputRow,
  CurrentlyPlayingContainer,
  ProfileDetailsLabel,
  ProfileDetailsRow,
  StyledAccountProfileDetails,
} from './AccountProfileDetailsSection.styles';
import { FormInput } from '../../../ui/FormInput/FormInput.styles';

import {
  BIO_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  kickUrl,
  twitchUrl,
  youtubeUrl,
} from '../../../data/consts';

import { onErrorToast } from '../../../utils/onErrorToast';

function AccountProfileDetailsSection() {
  const { user, isGettingUser } = useUser();
  const { profile, isGettingProfile, isFetchingProfile } = useProfileByUser(
    user?.id
  );

  const { gameData } = useAllGames();
  const [currentlyPlaying, setCurrentlyPlaying] = useState([]);

  const { updateProfile, isLoading: isUpdatingProfile } = useUpdateProfile(
    user?.id,
    profile?.username
  );

  const isLoading = isFetchingProfile || isGettingProfile || isUpdatingProfile;

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    watch,
    clearErrors,
    reset: resetProfile,
  } = useForm({ mode: 'onBlur', resetOptions: { keepDefaultValues: true } });
  const watchDisplayName = watch('displayName', profile?.displayName);
  const watchBio = watch('bio', profile?.bio);

  function onSubmitProfile(data) {
    const newProfileData = {
      displayName: data.displayName,
      bio: data.bio,
      twitch: data.twitch?.length > 0 ? data.twitch : null,
      youtube: data.twitch?.length > 0 ? data.youtube : null,
      kick: data.twitch?.length > 0 ? data.kick : null,
    };

    if (
      !profile ||
      (newProfileData.displayName === profile.displayName &&
        newProfileData.bio === profile.bio &&
        newProfileData.twitch === profile.twitch &&
        newProfileData.youtube === profile.youtube &&
        newProfileData.kick === profile.kick)
    )
      return;

    updateProfile(
      { userId: user.id, data: newProfileData },
      {
        onSuccess: () => toast(() => <Notification text="Updated Profile!" />),
        onError: () => {
          toast.error(() => (
            <Notification text="Unable to update Profile right now" />
          ));
          resetProfile();
        },
      }
    );
  }

  useEffect(
    function () {
      if (!profile) return;

      setCurrentlyPlaying(profile.currentGames || []);
    },
    [profile]
  );

  function addNewCurrentlyPlaying(e) {
    e?.preventDefault();

    setCurrentlyPlaying((currentlyPlaying) => [...currentlyPlaying, null]);
  }

  function removeCurrentlyPlaying(e, gameId) {
    e.preventDefault();

    setCurrentlyPlaying((currentlyPlaying) =>
      currentlyPlaying.filter((id) => id !== gameId && id)
    );

    if (!gameId) return;

    const currentGames = currentlyPlaying.filter((id) => id !== gameId && id);

    updateProfile({
      userId: user.id,
      data: {
        currentGames,
      },
    });
  }

  useEffect(() => {
    if (
      JSON.stringify(currentlyPlaying.filter((game) => game)) ===
        JSON.stringify(profile.currentGames) ||
      currentlyPlaying.length === 0
    )
      return;

    updateProfile(
      { userId: user.id, data: { currentGames: currentlyPlaying } },
      {
        onSuccess: () => toast(() => <Notification text="Updated Profile!" />),
        onError: () => {
          toast.error(() => (
            <Notification text="Unable to update Profile right now" />
          ));
        },
      }
    );
  }, [currentlyPlaying, profile, updateProfile, user]);

  if (isGettingUser || isGettingProfile || !profile) return <Spinner />;

  return (
    <>
      <StyledAccountProfileDetails
        onBlur={handleSubmitProfile(onSubmitProfile, (e) =>
          onErrorToast(e, clearErrors, resetProfile)
        )}
      >
        <ProfileDetailsRow>
          <ProfileDetailsLabel>Display Name</ProfileDetailsLabel>
          <FormInput
            id="displayName"
            type="text"
            {...registerProfile('displayName', {
              required: {
                value: true,
                message: 'Display name cannot be empty!',
              },
              minLength: {
                value: USERNAME_MIN_LENGTH,
                message: `Username must be at least ${USERNAME_MIN_LENGTH} characters!`,
              },
              maxLength: {
                value: USERNAME_MAX_LENGTH,
                message: `Username cannot be longer than ${USERNAME_MAX_LENGTH} characters!`,
              },
              validate: (value) =>
                !value.includes(' ') || 'Username cannot include white space!',
            })}
            defaultValue={profile.displayName}
            disabled={isLoading}
          ></FormInput>
          <TextCount
            value={watchDisplayName}
            minLength={USERNAME_MIN_LENGTH}
            maxLength={USERNAME_MAX_LENGTH}
          />
        </ProfileDetailsRow>

        <ProfileDetailsRow>
          <ProfileDetailsLabel>Bio</ProfileDetailsLabel>
          <AccountProfileBio
            id="bio"
            type="text"
            {...registerProfile('bio', {
              maxLength: {
                value: BIO_MAX_LENGTH,
                message: `Bio cannot be longer than ${BIO_MAX_LENGTH} characters!`,
              },
            })}
            defaultValue={profile?.bio}
            disabled={isLoading}
          />
          <TextCount value={watchBio} maxLength={BIO_MAX_LENGTH} />
        </ProfileDetailsRow>
      </StyledAccountProfileDetails>

      <StyledAccountProfileDetails>
        {gameData && currentlyPlaying ? (
          <ProfileDetailsRow>
            <ProfileDetailsLabel>Currently Playing</ProfileDetailsLabel>
            <CurrentlyPlayingContainer>
              {currentlyPlaying.length > 0
                ? currentlyPlaying.map((gameId) => (
                    <CurrentlyPlayingRow
                      key={`currentlyPlaying_${gameId}`}
                      gameId={gameId}
                      setCurrentlyPlaying={setCurrentlyPlaying}
                      currentlyPlaying={currentlyPlaying}
                      addNewCurrentlyPlaying={addNewCurrentlyPlaying}
                      removeCurrentlyPlaying={removeCurrentlyPlaying}
                    />
                  ))
                : null}
            </CurrentlyPlayingContainer>
          </ProfileDetailsRow>
        ) : (
          <Spinner />
        )}
      </StyledAccountProfileDetails>

      <StyledAccountProfileDetails
        onBlur={handleSubmitProfile(onSubmitProfile, (e) =>
          onErrorToast(e, clearErrors, resetProfile)
        )}
      >
        <ProfileDetailsRow>
          <ProfileDetailsLabel>Social Media</ProfileDetailsLabel>
          <AccountSocialMediaContainer>
            <AccountSocialMediaInputRow>
              <label>Twitch</label>
              <p>{`${twitchUrl}`}</p>
              <FormInput
                id="twitch"
                type="text"
                {...registerProfile('twitch', {
                  validate: (value) =>
                    !value.includes(' ') ||
                    'Twitch channel cannot include white space!',
                })}
                defaultValue={profile.twitch}
                disabled={isLoading}
                placeholder="myTwitchUser"
              ></FormInput>
              <FaTwitch />
            </AccountSocialMediaInputRow>

            <AccountSocialMediaInputRow>
              <label>YouTube</label>
              <p>{`${youtubeUrl}`}</p>
              <FormInput
                id="youtube"
                type="text"
                {...registerProfile('youtube', {
                  validate: (value) =>
                    !value.includes(' ') ||
                    'YouTube channel cannot include white space!',
                })}
                defaultValue={profile.youtube}
                disabled={isLoading}
                placeholder="myYoutubeChannel"
              ></FormInput>
              <GrYoutube />
            </AccountSocialMediaInputRow>

            <AccountSocialMediaInputRow>
              <label>Kick</label>
              <p>{`${kickUrl}`}</p>
              <FormInput
                id="kick"
                type="text"
                {...registerProfile('kick', {
                  validate: (value) =>
                    !value.includes(' ') ||
                    'Kick channel cannot include white space!',
                })}
                defaultValue={profile.kick}
                disabled={isLoading}
                placeholder="myKickUser"
              ></FormInput>
              <RiKickFill />
            </AccountSocialMediaInputRow>
          </AccountSocialMediaContainer>
        </ProfileDetailsRow>
      </StyledAccountProfileDetails>
    </>
  );
}

export default AccountProfileDetailsSection;
