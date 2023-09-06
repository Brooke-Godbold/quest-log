import { useNavigate } from "react-router-dom";

import { useUser } from "../../query/auth/useUser";

import LoginContainer from "../../features/auth/login-container/LoginContainer.component";

import { StyledLogin } from "./Login.styles";
import { usePageTitle } from "../../hooks/usePageTitle";

function Login() {
  usePageTitle("Login");

  const { isAuthenticated, user } = useUser();

  const navigate = useNavigate();

  isAuthenticated && navigate(`/social/${user.id}`);

  return (
    <StyledLogin>{!isAuthenticated ? <LoginContainer /> : null}</StyledLogin>
  );
}

export default Login;
