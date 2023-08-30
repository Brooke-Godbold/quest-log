import { useForm } from "react-hook-form";
import Spinner from "../../../ui/spinner/Spinner";
import { LoginFormInput } from "../../auth/login-form/LoginForm.styles";
import { useUser } from "../../auth/useUser";
import { useProfileByUser } from "../account-layout/useProfileByUser";
import {
  AccountProfileBio,
  AccountSocialMediaContainer,
  AccountSocialMediaInputRow,
  CurrentlyPlayingContainer,
  ProfileDetailsErrorContainer,
  ProfileDetailsLabel,
  ProfileDetailsRow,
  StyledAccountProfileDetails,
} from "./AccountProfileDetailsSection.styles";
import { FormError } from "../../../ui/form-error/FormError.styles";
import { useUpdateProfile } from "../useUpdateProfile";
import { useAllGames } from "./useAllGames";
import { useEffect, useState } from "react";
import CurrentlyPlayingRow from "../currently-playing-row/CurrentlyPlayingRow.component";
import TextCount from "../../../ui/text-count/TextCount.component";
import { kickUrl, twitchUrl, youtubeUrl } from "../../../data/consts";

import { FaTwitch } from "react-icons/fa";
import { GrYoutube } from "react-icons/gr";
import { RiKickFill } from "react-icons/ri";
import { toast } from "react-hot-toast";
import Notification from "../../../ui/notification/Notification.component";

const USERNAME_MIN_LENGTH = 8;
const USERNAME_MAX_LENGTH = 20;
const BIO_MAX_LENGTH = 450;

function AccountProfileDetailsSection() {
  const { user, isGettingUser } = useUser();
  const { profile, isGettingProfile, isFetchingProfile } = useProfileByUser(
    user ? user.id : null
  );

  const { gameData } = useAllGames();
  const [availableGames, setAvailableGames] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState([]);

  const {
    updateProfile,
    isLoading: isUpdatingProfile,
    isError,
  } = useUpdateProfile(user ? user.id : null);

  const isLoading = isFetchingProfile || isGettingProfile || isUpdatingProfile;

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const watchUsername = watch("username", "");
  const watchBio = watch("bio", "");

  const {
    register: registerCurrentPlaying,
    handleSubmit: handleSubmitCurrentlyPlaying,
  } = useForm({ mode: "onChange" });

  function onSubmitProfile(data) {
    const newProfileData = {
      username: data.username,
      bio: data.bio,
      twitch: data.twitch?.length > 0 ? data.twitch : null,
      youtube: data.twitch?.length > 0 ? data.youtube : null,
      kick: data.twitch?.length > 0 ? data.kick : null,
    };

    if (
      !profile ||
      (newProfileData.username === profile.username &&
        newProfileData.bio === profile.bio &&
        newProfileData.twitch === profile.twitch &&
        newProfileData.youtube === profile.youtube &&
        newProfileData.kick === profile.kick)
    )
      return;

    updateProfile(
      { userId: user.id, data: newProfileData },
      {
        onSuccess: () =>
          toast((t) => <Notification toast={t} text="Updated Profile!" />),
        onError: () =>
          toast.error((t) => (
            <Notification toast={t} text="Unable to update Profile right now" />
          )),
      }
    );
  }

  function onProfileError(e) {
    console.log("ERROR: ", e);
  }

  function onSubmitCurrentlyPlaying(data) {
    if (!user) return;

    const currentGames = Object.keys(data)
      .map((key) => {
        if (data[key] === "placeholder") return;
        return gameData.filter((game) => game.name === data[key])[0].id;
      })
      .filter((game) => game);

    updateProfile(
      {
        userId: user.id,
        data: {
          currentGames,
        },
      },
      {
        onSuccess: () =>
          toast((t) => <Notification toast={t} text="Updated Profile!" />),
        onError: () =>
          toast.error((t) => (
            <Notification toast={t} text="Unable to update Profile right now" />
          )),
      }
    );
  }

  useEffect(
    function () {
      if (!gameData) return;

      const games = gameData.reduce((acc, cur) => [...acc, cur.name], []);

      setAvailableGames(games);

      if (currentlyPlaying?.length === 0) addNewCurrentlyPlaying();
    },
    [gameData, currentlyPlaying]
  );

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

  if (isGettingUser || isGettingProfile || !profile) return <Spinner />;

  return (
    <>
      <StyledAccountProfileDetails
        onBlur={handleSubmitProfile(onSubmitProfile, onProfileError)}
      >
        <ProfileDetailsRow>
          <ProfileDetailsLabel>Username</ProfileDetailsLabel>
          <LoginFormInput
            id="username"
            type="text"
            {...registerProfile("username", {
              required: true,
              minLength: USERNAME_MIN_LENGTH,
              maxLength: USERNAME_MAX_LENGTH,
              validate: (value) => !value.includes(" "),
            })}
            defaultValue={profile.username}
            disabled={isLoading}
          ></LoginFormInput>
          <TextCount
            value={watchUsername}
            minLength={USERNAME_MIN_LENGTH}
            maxLength={USERNAME_MAX_LENGTH}
          />
          <ProfileDetailsErrorContainer>
            {errors.username ? (
              errors.username.type === "required" ? (
                <FormError>Username is required</FormError>
              ) : errors.username.type === "minLength" ? (
                <FormError>Usernames must be at least 8 characters</FormError>
              ) : errors.username.type === "maxLength" ? (
                <FormError>
                  Usernames cannot be more than 20 characters
                </FormError>
              ) : (
                <FormError>Usernames must not contain spaces</FormError>
              )
            ) : null}
            {isError && <FormError>Unable to update Username</FormError>}
          </ProfileDetailsErrorContainer>
        </ProfileDetailsRow>

        <ProfileDetailsRow>
          <ProfileDetailsLabel>Bio</ProfileDetailsLabel>
          <AccountProfileBio
            id="bio"
            type="text"
            {...registerProfile("bio", {
              maxLength: BIO_MAX_LENGTH,
            })}
            defaultValue={profile?.bio || ""}
            disabled={isLoading}
          />
          <TextCount value={watchBio} maxLength={BIO_MAX_LENGTH} />
          <ProfileDetailsErrorContainer>
            {errors.bio && (
              <FormError>Bio cannot be more than 450 characters!</FormError>
            )}
          </ProfileDetailsErrorContainer>
        </ProfileDetailsRow>
      </StyledAccountProfileDetails>

      <StyledAccountProfileDetails
        onChange={handleSubmitCurrentlyPlaying(onSubmitCurrentlyPlaying)}
      >
        {availableGames && gameData && currentlyPlaying ? (
          <ProfileDetailsRow>
            <ProfileDetailsLabel>Currently Playing</ProfileDetailsLabel>
            <CurrentlyPlayingContainer>
              {currentlyPlaying.length > 0
                ? currentlyPlaying.map((gameId, index) => (
                    <CurrentlyPlayingRow
                      key={`currentlyPlaying_${gameId}`}
                      gameId={gameId}
                      gameData={gameData}
                      rowIndex={index}
                      isLoading={isLoading}
                      currentlyPlaying={currentlyPlaying}
                      register={registerCurrentPlaying}
                      addNewCurrentlyPlaying={addNewCurrentlyPlaying}
                      removeCurrentlyPlaying={removeCurrentlyPlaying}
                      availableGames={availableGames}
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
        onBlur={handleSubmitProfile(onSubmitProfile, onProfileError)}
      >
        <ProfileDetailsRow>
          <ProfileDetailsLabel>Social Media</ProfileDetailsLabel>
          <AccountSocialMediaContainer>
            <AccountSocialMediaInputRow>
              <label>Twitch</label>
              <p>{`${twitchUrl}`}</p>
              <LoginFormInput
                id="twitch"
                type="text"
                {...registerProfile("twitch", {
                  validate: (value) => !value.includes(" "),
                })}
                defaultValue={profile.twitch || ""}
                disabled={isLoading}
                placeholder="myTwitchUser"
              ></LoginFormInput>
              <FaTwitch />
            </AccountSocialMediaInputRow>

            <AccountSocialMediaInputRow>
              <label>YouTube</label>
              <p>{`${youtubeUrl}`}</p>
              <LoginFormInput
                id="youtube"
                type="text"
                {...registerProfile("youtube", {
                  validate: (value) => !value.includes(" "),
                })}
                defaultValue={profile.youtube || ""}
                disabled={isLoading}
                placeholder="myYoutubeChannel"
              ></LoginFormInput>
              <GrYoutube />
            </AccountSocialMediaInputRow>

            <AccountSocialMediaInputRow>
              <label>Kick</label>
              <p>{`${kickUrl}`}</p>
              <LoginFormInput
                id="kick"
                type="text"
                {...registerProfile("kick", {
                  validate: (value) => !value.includes(" "),
                })}
                defaultValue={profile.kick || ""}
                disabled={isLoading}
                placeholder="myKickUser"
              ></LoginFormInput>
              <RiKickFill />
            </AccountSocialMediaInputRow>
          </AccountSocialMediaContainer>
        </ProfileDetailsRow>
      </StyledAccountProfileDetails>
    </>
  );
}

export default AccountProfileDetailsSection;
