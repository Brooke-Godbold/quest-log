import { FaFaceFrown } from "react-icons/fa6";
import {
  ImageContainer,
  NotFoundHeader,
  NotFoundText,
  StyledNotFound,
} from "../not-found/NotFound.styles";
import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();

  return (
    <StyledNotFound>
      <NotFoundHeader>Oh Snap!</NotFoundHeader>
      <NotFoundText>
        Sorry about that, it looks like something went wrong...
      </NotFoundText>
      <NotFoundText>{error?.message}</NotFoundText>
      <ImageContainer>
        <FaFaceFrown />
      </ImageContainer>
    </StyledNotFound>
  );
}

export default Error;
