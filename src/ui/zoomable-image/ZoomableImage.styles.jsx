import { styled } from "styled-components";

const StyledZoomableImage = styled.button`
  display: inline-block;

  border: solid 2px var(--color-brand-600);

  width: fit-content;
  height: fit-content;

  border-radius: 5px;
  overflow: hidden;

  transition: all 0.3s;

  &:hover {
    transform: scale(105%);
  }

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(110%);
  }
`;

const PreviewImage = styled.img`
  display: block;

  width: 15rem;
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  max-height: 75vh;
  max-width: 75vw;
`;

const LargeImage = styled.img`
  display: block;

  max-height: 75vh;
  max-width: 75vw;

  border-radius: 5px;
`;

export { StyledZoomableImage, LargeImage, PreviewImage, ImageContainer };
