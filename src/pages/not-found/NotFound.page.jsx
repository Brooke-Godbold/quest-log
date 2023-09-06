import { usePageTitle } from "../../hooks/usePageTitle";
import {
  ImageContainer,
  NotFoundHeader,
  NotFoundText,
  StyledNotFound,
} from "./NotFound.styles";
import { FaFaceFrown } from "react-icons/fa6";

function NotFound() {
  usePageTitle("Not Found");

  return (
    <StyledNotFound>
      <NotFoundHeader>404</NotFoundHeader>
      <NotFoundText>It looks like that doesn&apos;t exist...</NotFoundText>
      <ImageContainer>
        <FaFaceFrown />
      </ImageContainer>
    </StyledNotFound>
  );
}

export default NotFound;
