import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { useLogout } from "../../features/auth/useLogout";
import { useUser } from "../../features/auth/useUser";

import LoginForm from "../../features/auth/login-form/LoginForm.component";
import Modal from "../modal/Modal.component";
import {
  HeaderButton,
  HeaderLink,
  HeaderLinks,
  HeaderLogoImage,
  HeaderSearch,
  HeaderSearchForm,
  StyledHeader,
} from "./Header.styles";
import ResetPasswordRequestForm from "../../features/auth/reset-password-request-form/ResetPasswordRequestForm.component";
import { supabaseStoragePath, supabaseUrl } from "../../services/supabase";

function Header() {
  const [isResetPassword, setIsResetPassword] = useState(false);

  const { isGettingUser, isAuthenticated } = useUser();
  const { logout, isLoggingOut } = useLogout();

  const { register, handleSubmit } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  function onSearch(data) {
    console.log(data);

    navigate(`/search?query=${data.search}`, { replace: true });
  }

  return (
    <StyledHeader>
      <HeaderLink to="/">
        <HeaderLogoImage
          src={`${supabaseUrl}/${supabaseStoragePath}/brand/logo.png`}
        />
      </HeaderLink>
      <HeaderLinks>
        {location.pathname !== "/search" && (
          <HeaderSearchForm onSubmit={handleSubmit(onSearch)}>
            <HeaderSearch {...register("search", { required: true })} />
          </HeaderSearchForm>
        )}
        {isAuthenticated ? (
          <>
            <HeaderLink to="/account">Profile</HeaderLink>
            <HeaderButton onClick={logout} disabled={isLoggingOut}>
              Logout
            </HeaderButton>
          </>
        ) : (
          <Modal>
            <Modal.Open opens="login">
              <HeaderButton disabled={isGettingUser}>Login</HeaderButton>
            </Modal.Open>
            <Modal.Window
              name="login"
              onCloseCallback={() => setIsResetPassword(false)}
            >
              {isResetPassword ? (
                <ResetPasswordRequestForm
                  setIsResetPassword={setIsResetPassword}
                />
              ) : (
                <LoginForm setIsResetPassword={setIsResetPassword} />
              )}
            </Modal.Window>
          </Modal>
        )}
      </HeaderLinks>
    </StyledHeader>
  );
}

export default Header;
