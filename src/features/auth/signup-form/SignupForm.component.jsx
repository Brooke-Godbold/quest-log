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

import { LoginFormErrorContainer } from "../login-form/LoginForm.styles";
import {
  CurrentlyPlayingContainer,
  SignUpGridContainer,
  SignUpGridItem,
  SignupHeading,
  SignupSuccessContainer,
  SignupSuccessText,
  StyledSignupForm,
} from "./SIgnupForm.styles";
import { FormError } from "../../../ui/form-error/FormError.styles";
import { ProfileDetailsLabel } from "../../account/account-profile-details-section/AccountProfileDetailsSection.styles";
import { FormInput } from "../../../ui/FormInput/FormInput.styles";
import { useAllGames } from "../../../query/game/useAllGames";
import Spinner from "../../../ui/spinner/Spinner";
import { CurrentlyPlaying } from "../../account/currently-playing-row/CurrentlyPlayingRow.styles";

const USERNAME_MIN_LENGTH = 8;
const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;

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
    console.log(`ERROR`, e);
  }

  useEffect(
    function () {
      if (!emailCheckProfiles || !usernameCheckProfiles) return;

      if (emailCheckProfiles.length > 0) {
        setError("email", { type: "inUse" });
      } else if (usernameCheckProfiles.length > 0) {
        setError("username", { type: "inUse" });
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
                  required: true,
                  pattern: /\S+@\S+\.\S+/,
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
                  required: true,
                  minLength: USERNAME_MIN_LENGTH,
                  maxLength: USERNAME_MAX_LENGTH,
                  validate: (value) => !value.includes(" "),
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
                  required: true,
                  minLength: PASSWORD_MIN_LENGTH,
                  validate: (value) => !value.includes(" "),
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
                  required: true,
                  validate: (value) => value === getValues().password,
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
                    validate: (value) => value !== "placeholder",
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

          <LoginFormErrorContainer>
            {errors.email ? (
              errors.email.type === "required" ? (
                <FormError>Email is required</FormError>
              ) : errors.email.type === "inUse" ? (
                <FormError>This email has already been registered</FormError>
              ) : (
                <FormError>This is not a valid email address</FormError>
              )
            ) : null}

            {errors.username ? (
              errors.username.type === "required" ? (
                <FormError>Username is required</FormError>
              ) : errors.username.type === "minLength" ? (
                <FormError>Usernames must be at least 8 characters</FormError>
              ) : errors.username.type === "maxLength" ? (
                <FormError>
                  Usernames cannot be more than 20 characters
                </FormError>
              ) : errors.username.type === "inUse" ? (
                <FormError>This username is already in use</FormError>
              ) : (
                <FormError>Usernames must not contain spaces</FormError>
              )
            ) : null}

            {errors.password ? (
              errors.password.type === "required" ? (
                <FormError>Password is required</FormError>
              ) : errors.password.type === "minLength" ? (
                <FormError>Passwords must be at least 8 characters</FormError>
              ) : (
                <FormError>Passwords must not contain spaces</FormError>
              )
            ) : null}

            {errors.passwordConfirm && (
              <FormError>Passwords must match</FormError>
            )}

            {errors.currentlyPlaying && (
              <FormError>Select what you&apos;re playing currently!</FormError>
            )}
          </LoginFormErrorContainer>

          <Button disabled={isLoading} isLight={false}>
            Sign Up
          </Button>
        </StyledSignupForm>
      )}
    </>
  );
}

export default SignupForm;
