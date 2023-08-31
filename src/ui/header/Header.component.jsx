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
  UnreadMessages,
} from "./Header.styles";
import { supabaseStoragePath, supabaseUrl } from "../../services/supabase";
import LoginModal from "../login-modal/LoginModal.component";
import { useMessages } from "../../features/messages/useMessages";
import { useUnreadMessagesCount } from "../../hooks/useUnreadMessagesCount";

function Header() {
  const { isGettingUser, isAuthenticated, user } = useUser();
  const { logout, isLoggingOut } = useLogout();

  const { register, handleSubmit, reset } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const { conversations } = useMessages(user?.id);
  const unreadMessagesCount = useUnreadMessagesCount(user, conversations);

  function onSearch(data) {
    console.log(data);

    reset();
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
            <HeaderSearch
              disabled={isLoggingOut}
              {...register("search", { required: true })}
            />
          </HeaderSearchForm>
        )}
        <HeaderLink disabled={isLoggingOut} to="/social/feed?view=trending">
          Trending
        </HeaderLink>
        {isAuthenticated ? (
          <>
            <HeaderLink
              disabled={isLoggingOut}
              to="/social/feed?view=following"
            >
              Following
            </HeaderLink>
            <HeaderLink disabled={isLoggingOut} to="/social/feed?view=discover">
              Discover
            </HeaderLink>
            <HeaderLink
              disabled={isLoggingOut}
              to={`/social/${user.id}?view=posts`}
            >
              My Feed
            </HeaderLink>
            <HeaderLink disabled={isLoggingOut} to="/account/profile">
              Account
            </HeaderLink>
            <HeaderLink disabled={isLoggingOut} to="/messages">
              Messages
              {unreadMessagesCount > 0 && (
                <UnreadMessages>{unreadMessagesCount}</UnreadMessages>
              )}
            </HeaderLink>
            <HeaderButton onClick={logout} disabled={isLoggingOut}>
              Logout
            </HeaderButton>
          </>
        ) : (
          location.pathname !== "/login" && (
            <LoginModal
              loginButton={
                <HeaderButton disabled={isGettingUser}>Login</HeaderButton>
              }
            />
          )
        )}
      </HeaderLinks>
    </StyledHeader>
  );
}

export default Header;
