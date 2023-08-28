import { StyledLogin } from "./Login.styles";
import LoginContainer from "../../features/auth/login-container/LoginContainer.component";
import { useUser } from "../../features/auth/useUser";
import { useNavigate } from "react-router-dom";

function Login() {
  const { isAuthenticated, user } = useUser();

  const navigate = useNavigate();

  isAuthenticated && navigate(`/social/${user.id}`);

  return (
    <StyledLogin>{!isAuthenticated ? <LoginContainer /> : null}</StyledLogin>
  );
}

export default Login;