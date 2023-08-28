import { useForm } from "react-hook-form";
import Spinner from "../../../ui/spinner/Spinner";
import { LoginFormInput } from "../../auth/login-form/LoginForm.styles";
import { useUser } from "../../auth/useUser";
import { useProfileByUser } from "../account-layout/useProfileByUser";
import {
  AccountProfileBio,
  AccountProfileBioSection,
  BioTextCount,
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
  const watchBio = watch("bio", "");

  const {
    register: registerCurrentPlaying,
    handleSubmit: handleSubmitCurrentlyPlaying,
  } = useForm({ mode: "onChange" });

  function onSubmitProfile(data) {
    if (
      !profile ||
      (data.username === profile.username && data.bio === profile.bio)
    )
      return;

    const newProfileData = { username: data.userName, bio: data.bio };

    updateProfile({ userId: user.id, data: newProfileData });
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

    updateProfile({
      userId: user.id,
      data: {
        currentGames,
      },
    });
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
              minLength: 8,
              maxLength: 20,
              validate: (value) => !value.includes(" "),
            })}
            defaultValue={profile.username}
            disabled={isLoading}
          ></LoginFormInput>
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
          <AccountProfileBioSection>
            <AccountProfileBio
              id="bio"
              type="text"
              {...registerProfile("bio", {
                maxLength: BIO_MAX_LENGTH,
              })}
              defaultValue={profile?.bio || ""}
              disabled={isLoading}
            />
            <BioTextCount>{`${
              watchBio?.length || 0
            } / ${BIO_MAX_LENGTH}`}</BioTextCount>
          </AccountProfileBioSection>
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
    </>
  );
}

export default AccountProfileDetailsSection;
