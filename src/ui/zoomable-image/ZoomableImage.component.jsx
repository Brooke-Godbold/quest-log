import PropTypes from 'prop-types';

import {
  ImageContainer,
  LargeImage,
  PreviewImage,
  StyledZoomableImage,
} from './ZoomableImage.styles';
import Modal from '../modal/Modal.component';

function ZoomableImage({ imageUrl }) {
  return (
    <Modal>
      <Modal.Open opens="image">
        <StyledZoomableImage>
          <PreviewImage src={imageUrl} />
        </StyledZoomableImage>
      </Modal.Open>
      <Modal.Window name="image">
        <MainImage imageUrl={imageUrl} />
      </Modal.Window>
    </Modal>
  );
}

ZoomableImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

function MainImage({ imageUrl }) {
  return (
    <ImageContainer>
      <LargeImage src={imageUrl} />
    </ImageContainer>
  );
}

MainImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default ZoomableImage;
