import { useSearchParams } from "react-router-dom";
import Button from "../../ui/button/Button.component";
import {
  ConfirmSignupHeading,
  StyledConfirmSignup,
} from "./ConfirmSignup.styles";

function ConfirmSignup() {
  const [searchParams] = useSearchParams();

  console.log(searchParams.get("confirmationUrl"));

  return (
    <StyledConfirmSignup>
      <ConfirmSignupHeading>Confirm your Email</ConfirmSignupHeading>
      <Button
        isLight={false}
        isLink={true}
        href={searchParams.get("confirmationUrl")}
      >
        Confirm Email
      </Button>
    </StyledConfirmSignup>
  );
}

export default ConfirmSignup;
