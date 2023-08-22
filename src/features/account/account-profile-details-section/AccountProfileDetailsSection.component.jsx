import { useForm } from "react-hook-form";
import Spinner from "../../../ui/spinner/Spinner";
import { LoginFormInput } from "../../auth/login-form/LoginForm.styles";
import { useUser } from "../../auth/useUser";
import { useProfileByUser } from "../account-layout/useProfileByUser";
import {
  ProfileDetailsErrorContainer,
  ProfileDetailsLabel,
  ProfileDetailsRow,
  StyledAccountProfileDetails,
} from "./AccountProfileDetailsSection.styles";
import { FormError } from "../../../ui/form-error/FormError.styles";
import { useUpdateProfile } from "../useUpdateProfile";

function AccountProfileDetailsSection() {
  const { user, isGettingUser } = useUser();
  const { profile, isGettingProfile } = useProfileByUser(user ? user.id : null);

  const {
    updateProfile,
    isLoading: isUpdatingProfile,
    isError,
  } = useUpdateProfile(user ? user.id : null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  function onSubmit(data) {
    if (!profile || data.username === profile.username) return;

    updateProfile({ userId: user.id, data: { username: data.username } });
  }

  function onError(e) {
    console.log("ERROR: ", e);
  }

  if (isGettingUser || isGettingProfile || !profile) return <Spinner />;

  return (
    <StyledAccountProfileDetails onBlur={handleSubmit(onSubmit, onError)}>
      <ProfileDetailsRow>
        <ProfileDetailsLabel>Username</ProfileDetailsLabel>
        <LoginFormInput
          id="username"
          type="text"
          {...register("username", {
            required: true,
            minLength: 8,
            maxLength: 20,
            validate: (value) => !value.includes(" "),
          })}
          defaultValue={profile.username}
          disabled={isUpdatingProfile}
        ></LoginFormInput>
        <ProfileDetailsErrorContainer>
          {errors.username ? (
            errors.username.type === "required" ? (
              <FormError>Username is required</FormError>
            ) : errors.username.type === "minLength" ? (
              <FormError>Usernames must be at least 8 characters</FormError>
            ) : errors.username.type === "maxLength" ? (
              <FormError>Usernames cannot be more than 20 characters</FormError>
            ) : (
              <FormError>Usernames must not contain spaces</FormError>
            )
          ) : null}
          {isError && <FormError>Unable to update Username</FormError>}
        </ProfileDetailsErrorContainer>
      </ProfileDetailsRow>
    </StyledAccountProfileDetails>
  );
}

export default AccountProfileDetailsSection;
