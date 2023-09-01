import PropTypes from "prop-types";

import {
  ImageContainer,
  LargeImage,
  PreviewImage,
  StyledZoomableImage,
} from "./ZoomableImage.styles";
import Modal from "../modal/Modal.component";

function ZoomableImage({ imageUrl }) {
  return (
    <Modal>
      <Modal.Open opens="image">
        <StyledZoomableImage>
          <PreviewImage src={imageUrl} />
        </StyledZoomableImage>
      </Modal.Open>
      <Modal.Window name="image">
        <ImageContainer>
          <LargeImage src={imageUrl} />
        </ImageContainer>
      </Modal.Window>
    </Modal>
  );
}

ZoomableImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default ZoomableImage;
