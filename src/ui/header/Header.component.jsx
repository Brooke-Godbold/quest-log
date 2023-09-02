import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { supabaseStoragePath, supabaseUrl } from "../../services/supabase";

import { useLogout } from "../../query/auth/useLogout";
import { useUser } from "../../query/auth/useUser";
import { useMessages } from "../../query/message/useMessages";
import { useUnreadMessagesCount } from "../../hooks/useUnreadMessagesCount";

import LoginModal from "../login-modal/LoginModal.component";

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
        <HeaderLink
          $active={location.search.includes("trending")}
          disabled={isLoggingOut}
          to="/social/feed?view=trending"
        >
          Trending
        </HeaderLink>
        {isAuthenticated ? (
          <>
            <HeaderLink
              $active={location.search.includes("following")}
              to="/social/feed?view=following"
            >
              Following
            </HeaderLink>
            <HeaderLink
              $active={location.search.includes("discover")}
              disabled={isLoggingOut}
              to="/social/feed?view=discover"
            >
              Discover
            </HeaderLink>
            <HeaderLink
              $active={true}
              disabled={isLoggingOut}
              to={`/social/${user.id}?view=posts`}
            >
              My Feed
            </HeaderLink>
            <HeaderLink
              $active={true}
              disabled={isLoggingOut}
              to="/account/profile"
            >
              Account
            </HeaderLink>
            <HeaderLink $active={true} disabled={isLoggingOut} to="/messages">
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
