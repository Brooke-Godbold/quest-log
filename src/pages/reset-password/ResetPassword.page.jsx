import ResetPasswordSection from "../../features/account/reset-password-section/ResetPasswordSection.component";
import Spinner from "../../ui/spinner/Spinner";
import {
  ResetPasswordHeading,
  StyledResetPassword,
} from "./ResetPassword.styles";
import supabase from "../../services/supabase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";

function ResetPassword() {
  usePageTitle("Reset Password");

  const [isShowPasswordReset, setIsShowPasswordReset] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event == "PASSWORD_RECOVERY") {
        setIsShowPasswordReset(true);
      }
      if (event == "USER_UPDATED") {
        navigate("/search", { replace: true });
      }
    });
  }, [navigate]);

  return (
    <StyledResetPassword>
      {isShowPasswordReset ? (
        <>
          <ResetPasswordHeading>Reset Your Password</ResetPasswordHeading>
          <ResetPasswordSection />
        </>
      ) : (
        <Spinner />
      )}
    </StyledResetPassword>
  );
}

export default ResetPassword;
