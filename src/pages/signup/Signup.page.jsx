import SignupForm from "../../features/auth/signup-form/SignupForm.component";
import { usePageTitle } from "../../hooks/usePageTitle";
import { StyledSignup } from "./Signup.styles";

function Signup() {
  usePageTitle("Sign Up");

  return (
    <StyledSignup>
      <SignupForm />
    </StyledSignup>
  );
}

export default Signup;
