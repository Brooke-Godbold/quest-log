import { useForm } from "react-hook-form";

import { useUpdatePassword } from "../../../query/auth/useUpdatePassword";

import Button from "../../../ui/button/Button.component";
import TextCount from "../../../ui/text-count/TextCount.component";

import {
  ProfileDetailsLabel,
  ProfileDetailsRow,
  StyledAccountProfileDetails,
} from "../account-profile-details-section/AccountProfileDetailsSection.styles";
import { ResetPasswordButtonContainer } from "./ResetPasswordSection.styles";
import { FormInput } from "../../../ui/FormInput/FormInput.styles";

import { onErrorToast } from "../../../utils/onErrorToast";

import { PASSWORD_MIN_LENGTH } from "../../../data/consts";

function ResetPasswordSection() {
  const { register, handleSubmit, getValues, reset, watch, clearErrors } =
    useForm();
  const watchPassword = watch("password", "");

  const { updatePassword, isLoading } = useUpdatePassword();

  function onChangePassword(data) {
    updatePassword(data.password, {
      onSettled: () => reset(),
    });
  }

  function onError(e) {
    onErrorToast(e, clearErrors, reset);
  }

  return (
    <StyledAccountProfileDetails
      onSubmit={handleSubmit(onChangePassword, onError)}
    >
      <ProfileDetailsRow>
        <ProfileDetailsLabel>New Password</ProfileDetailsLabel>
        <FormInput
          type="password"
          id="password"
          {...register("password", {
            required: { value: true, message: "Password cannot be empty!" },
            minLength: {
              value: PASSWORD_MIN_LENGTH,
              message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters!`,
            },
            validate: (value) => !value.includes(" "),
          })}
          disabled={isLoading}
        />
        <TextCount value={watchPassword} minLength={PASSWORD_MIN_LENGTH} />
      </ProfileDetailsRow>

      <ProfileDetailsRow>
        <ProfileDetailsLabel>Confirm New Password</ProfileDetailsLabel>
        <FormInput
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: {
              value: true,
              message: "Confirm Password cannot be empty!",
            },
            validate: (value) =>
              value === getValues().password || "Passwords must match!",
          })}
          disabled={isLoading}
        />
      </ProfileDetailsRow>

      <ResetPasswordButtonContainer>
        <Button>Update Password</Button>
      </ResetPasswordButtonContainer>
    </StyledAccountProfileDetails>
  );
}

export default ResetPasswordSection;
