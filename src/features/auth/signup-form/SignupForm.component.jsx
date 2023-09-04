import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useUser } from "../../../query/auth/useUser";
import { useProfile } from "../../../query/profile/useProfile";
import { useSignup } from "../../../query/auth/useSignup";
import { useAddProfile } from "../../../query/profile/useAddProfile";
import { useProfilesByUsername } from "../../../query/profile/useProfilesByUsername";

import Button from "../../../ui/button/Button.component";
import TextCount from "../../../ui/text-count/TextCount.component";
import Notification from "../../../ui/notification/Notification.component";

import {
  CurrentlyPlayingContainer,
  SignUpGridContainer,
  SignUpGridItem,
  SignupHeading,
  SignupSuccessContainer,
  SignupSuccessText,
  StyledSignupForm,
} from "./SIgnupForm.styles";
import { ProfileDetailsLabel } from "../../account/account-profile-details-section/AccountProfileDetailsSection.styles";
import { FormInput } from "../../../ui/FormInput/FormInput.styles";
import { useAllGames } from "../../../query/game/useAllGames";
import Spinner from "../../../ui/spinner/Spinner";
import { CurrentlyPlaying } from "../../account/currently-playing-row/CurrentlyPlayingRow.styles";

import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "../../../data/consts";

import { onErrorToast } from "../../../utils/onErrorToast";

function SignupForm() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  if (isAuthenticated) navigate("/search", { replace: true });

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm();
  const watchUsername = watch("username", "");
  const watchPassword = watch("password", "");

  const [emailCheck, setEmailCheck] = useState("");
  const [usernameCheck, setUsernameCheck] = useState("");

  const { gameData, isLoading: isLoadingGames } = useAllGames();
  const [gameQuery, setGameQuery] = useState("");
  const [availableGames, setAvailableGames] = useState([]);

  const [signupSuccess, setSignupSuccess] = useState(false);

  const { isGettingProfile: isCheckingEmail, profile: emailCheckProfiles } =
    useProfile(emailCheck);
  const {
    isGettingProfile: isCheckingUsername,
    profile: usernameCheckProfiles,
  } = useProfilesByUsername(usernameCheck);

  const { signup, isSigningUp } = useSignup();
  const { addProfile, isAddingProfile } = useAddProfile();

  const isLoading =
    isCheckingEmail ||
    isCheckingUsername ||
    isSigningUp ||
    isAddingProfile ||
    isLoadingGames;

  useEffect(() => {
    if (!gameData) return;

    if (gameQuery.length < 3) setAvailableGames([]);
    else {
      const available = gameData.filter((game) =>
        game.name.toLowerCase().includes(gameQuery.toLowerCase())
      );
      setAvailableGames(available);
    }
  }, [gameQuery, gameData]);

  useEffect(() => {
    const availableIds = availableGames.reduce(
      (acc, cur) => [...acc, cur.id],
      []
    );

    setValue(
      "currentlyPlaying",
      availableIds.includes(Number(getValues().currentlyPlaying))
        ? getValues().currentlyPlaying
        : availableIds.length > 0
        ? availableIds[0]
        : "placeholder"
    );
  }, [availableGames, getValues, setValue]);

  function onSubmit(data) {
    setEmailCheck(data.email);
    setUsernameCheck(data.username);
  }

  function onError(e) {
    onErrorToast(e);
  }

  useEffect(
    function () {
      if (!emailCheckProfiles || !usernameCheckProfiles) return;

      if (emailCheckProfiles.length > 0) {
        toast.error(() => (
          <Notification text="That email is already in use!" />
        ));
      } else if (usernameCheckProfiles.length > 0) {
        toast.error(() => (
          <Notification text="That username is already in use!" />
        ));
      } else {
        signup(
          { email: getValues().email, password: getValues().password },
          {
            onSuccess: (user) => {
              addProfile(
                {
                  email: getValues().email,
                  userId: user.user.id,
                  username: getValues().username,
                  displayName: getValues().username,
                  currentGames: [getValues().currentlyPlaying],
                },
                {
                  onSuccess: () => setSignupSuccess(true),
                  onError: (error) => {
                    console.log(error);
                    toast.error((t) => (
                      <Notification
                        toast={t}
                        text="Unable to Sign Up at this time"
                      />
                    ));
                  },
                }
              );
            },
            onError: () => {
              toast.error((t) => (
                <Notification toast={t} text="Unable to Sign Up at this time" />
              ));
            },
          }
        );
      }
    },
    [
      emailCheckProfiles,
      setError,
      usernameCheckProfiles,
      signup,
      addProfile,
      getValues,
    ]
  );

  if (!gameData) return <Spinner />;

  return (
    <>
      {signupSuccess ? (
        <SignupSuccessContainer>
          <SignupHeading>Almost There!</SignupHeading>
          <SignupSuccessText>
            Please verify your email before you login
          </SignupSuccessText>
        </SignupSuccessContainer>
      ) : (
        <StyledSignupForm onSubmit={handleSubmit(onSubmit, onError)}>
          <SignupHeading>Sign Up</SignupHeading>
          <SignUpGridContainer>
            <SignUpGridItem>
              <ProfileDetailsLabel>Email</ProfileDetailsLabel>
              <FormInput
                type="email"
                id="email"
                placeholder="john.smith@gmail.com"
                disabled={isLoading}
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", {
                  required: {
                    value: true,
                    message: "An email address is required!",
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Your email must be a valid email address!",
                  },
                })}
                $error={errors.email}
              />
            </SignUpGridItem>

            <SignUpGridItem>
              <ProfileDetailsLabel>Username</ProfileDetailsLabel>
              <FormInput
                type="text"
                id="username"
                placeholder="John_Smith"
                disabled={isLoading}
                aria-invalid={errors.username ? "true" : "false"}
                {...register("username", {
                  required: { value: true, message: "A username is required!" },
                  minLength: {
                    value: USERNAME_MIN_LENGTH,
                    message: `Username must be at least ${USERNAME_MIN_LENGTH} characters!`,
                  },
                  maxLength: {
                    value: USERNAME_MAX_LENGTH,
                    message: `Username cannot be more than ${USERNAME_MAX_LENGTH} characters!`,
                  },
                  validate: (value) =>
                    !value.includes(" ") ||
                    "Username cannot include white space!",
                })}
                $error={errors.username}
              />
              <TextCount
                value={watchUsername}
                minLength={USERNAME_MIN_LENGTH}
                maxLength={USERNAME_MAX_LENGTH}
              />
            </SignUpGridItem>

            <SignUpGridItem>
              <ProfileDetailsLabel>Password</ProfileDetailsLabel>
              <FormInput
                type="password"
                id="password"
                disabled={isLoading}
                aria-invalid={errors.password ? "true" : "false"}
                {...register("password", {
                  required: { value: true, message: "A password is required!" },
                  minLength: {
                    value: PASSWORD_MIN_LENGTH,
                    message: `Your password must be at least ${PASSWORD_MIN_LENGTH} characters!`,
                  },
                  validate: (value) =>
                    !value.includes(" ") ||
                    "Password cannot include white space!",
                })}
                $error={errors.password}
              />
              <TextCount
                value={watchPassword}
                minLength={PASSWORD_MIN_LENGTH}
              />
            </SignUpGridItem>

            <SignUpGridItem>
              <ProfileDetailsLabel>Confirm Password</ProfileDetailsLabel>
              <FormInput
                type="password"
                id="passwordConfirm"
                disabled={isLoading}
                aria-invalid={errors.passwordConfirm ? "true" : "false"}
                {...register("passwordConfirm", {
                  required: {
                    value: true,
                    message: "You must confirm your password!",
                  },
                  validate: (value) =>
                    value === getValues().password || "Passwords must match!",
                })}
                $error={errors.passwordConfirm}
              />
            </SignUpGridItem>

            <SignUpGridItem>
              <ProfileDetailsLabel>Currently Playing</ProfileDetailsLabel>
              <CurrentlyPlayingContainer>
                <FormInput
                  list="games"
                  id="currentlyPlayingSearch"
                  onChange={(e) => setGameQuery(e.target.value)}
                  placeholder="playing something new?"
                />

                <CurrentlyPlaying
                  disabled={isLoading}
                  id="currentlyPlaying"
                  {...register("currentlyPlaying", {
                    validate: (value) =>
                      value !== "placeholder" ||
                      "Select what you're currently playing!",
                  })}
                >
                  <option key="placeholder" value="placeholder">
                    Please Select...
                  </option>
                  {availableGames.map((game) => (
                    <option key={game.id} value={game.id}>
                      {game.name}
                    </option>
                  ))}
                </CurrentlyPlaying>
              </CurrentlyPlayingContainer>
            </SignUpGridItem>
          </SignUpGridContainer>

          <Button disabled={isLoading} isLight={false}>
            Sign Up
          </Button>
        </StyledSignupForm>
      )}
    </>
  );
}

export default SignupForm;
