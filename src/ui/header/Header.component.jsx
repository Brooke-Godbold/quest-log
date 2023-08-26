import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useLogout } from "../../features/auth/useLogout";
import { useUser } from "../../features/auth/useUser";

import {
  HeaderButton,
  HeaderLink,
  HeaderLinks,
  HeaderLogoImage,
  HeaderSearch,
  HeaderSearchForm,
  StyledHeader,
} from "./Header.styles";
import { supabaseStoragePath, supabaseUrl } from "../../services/supabase";
import LoginModal from "../login-modal/LoginModal.component";

function Header() {
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
            <HeaderLink disabled={isLoggingOut} to="/account/profile">
              Profile
            </HeaderLink>
            <HeaderButton onClick={logout} disabled={isLoggingOut}>
              Logout
            </HeaderButton>
          </>
        ) : (
          <LoginModal
            loginButton={
              <HeaderButton disabled={isGettingUser}>Login</HeaderButton>
            }
          />
        )}
      </HeaderLinks>
    </StyledHeader>
  );
}

export default Header;
