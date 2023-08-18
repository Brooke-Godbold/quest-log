import LoginForm from "../../features/auth/login-form/LoginForm.component";
import { useUser } from "../../features/auth/useUser";
import Modal from "../modal/Modal.component";
import {
  HeaderButton,
  HeaderLinks,
  HeaderLogo,
  StyledHeader,
} from "./Header.styles";
import { useLogout } from "../../features/auth/useLogout";

function Header() {
  const { isGettingUser, isAuthenticated } = useUser();
  const { logout, isLoggingOut } = useLogout();

  return (
    <StyledHeader>
      <HeaderLogo>LOGO</HeaderLogo>
      <HeaderLinks>
        {isAuthenticated ? (
          <>
            <p>Profile</p>
            <HeaderButton onClick={logout} disabled={isLoggingOut}>
              Logout
            </HeaderButton>
          </>
        ) : (
          <Modal>
            <Modal.Open opens="login">
              <HeaderButton disabled={isGettingUser}>Login</HeaderButton>
            </Modal.Open>
            <Modal.Window name="login">
              <LoginForm />
            </Modal.Window>
          </Modal>
        )}
      </HeaderLinks>
    </StyledHeader>
  );
}

export default Header;
