import { useForm } from "react-hook-form";

import { useUpdatePassword } from "../../../query/auth/useUpdatePassword";

import Button from "../../../ui/button/Button.component";
import TextCount from "../../../ui/text-count/TextCount.component";

import {
  ProfileDetailsErrorContainer,
  ProfileDetailsLabel,
  ProfileDetailsRow,
  StyledAccountProfileDetails,
} from "../account-profile-details-section/AccountProfileDetailsSection.styles";
import { FormError } from "../../../ui/form-error/FormError.styles";
import {
  ResetPasswordButtonContainer,
  ResetPasswordSuccessContainer,
} from "./ResetPasswordSection.styles";
import { FormSuccess } from "../../../ui/form-success/FormSuccess.styles";
import { FormInput } from "../../../ui/FormInput/FormInput.styles";

const PASSWORD_MIN_LENGTH = 8;

function ResetPasswordSection() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const watchPassword = watch("password", "");

  const { updatePassword, isLoading, isError, isSuccess } = useUpdatePassword();

  function onChangePassword(data) {
    updatePassword(data.password);
    reset();
  }

  return (
    <StyledAccountProfileDetails onSubmit={handleSubmit(onChangePassword)}>
      <ProfileDetailsRow>
        <ProfileDetailsLabel>New Password</ProfileDetailsLabel>
        <FormInput
          type="password"
          id="password"
          {...register("password", {
            required: true,
            minLength: PASSWORD_MIN_LENGTH,
            validate: (value) => !value.includes(" "),
          })}
          disabled={isLoading}
        />
        <TextCount value={watchPassword} minLength={PASSWORD_MIN_LENGTH} />
        <ProfileDetailsErrorContainer>
          {errors.password ? (
            errors.password.type === "required" ? (
              <FormError>Password is required</FormError>
            ) : errors.password.type === "minLength" ? (
              <FormError>Passwords must be at least 8 characters</FormError>
            ) : (
              <FormError>Passwords must not contain spaces</FormError>
            )
          ) : null}
        </ProfileDetailsErrorContainer>
      </ProfileDetailsRow>

      <ProfileDetailsRow>
        <ProfileDetailsLabel>Confirm New Password</ProfileDetailsLabel>
        <FormInput
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: true,
            validate: (value) => value === getValues().password,
          })}
          disabled={isLoading}
        />
        <ProfileDetailsErrorContainer>
          {errors.passwordConfirm && (
            <FormError>Passwords must match</FormError>
          )}
        </ProfileDetailsErrorContainer>
      </ProfileDetailsRow>

      <ResetPasswordSuccessContainer>
        {isError && <FormError>Unable to update Password</FormError>}
        {isSuccess && <FormSuccess>Password successfully updated!</FormSuccess>}
      </ResetPasswordSuccessContainer>

      <ResetPasswordButtonContainer>
        <Button>Update Password</Button>
      </ResetPasswordButtonContainer>
    </StyledAccountProfileDetails>
  );
}

export default ResetPasswordSection;
