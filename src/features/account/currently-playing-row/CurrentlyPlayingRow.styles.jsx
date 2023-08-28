import { styled } from "styled-components";

const StyledCurrentlyPlayingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
`;

const CurrentlyPlaying = styled.select`
  padding: 1rem 2rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-brand-50);
  color: var(--color-brand-600);
  width: 100%;
`;

const CurrentlyPlayingButton = styled.button`
  background-color: var(--color-brand-300);
  border: none;
  border-radius: 50%;
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  height: 100%;
  width: auto;
  padding: 0.75rem;
  transition: all 0.3s;
  transform: scale(100%);

  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--color-brand-400);
    transform: scale(125%);
  }

  & svg {
    transform: scale(150%);
    color: var(--color-brand-700);
  }
`;

export { StyledCurrentlyPlayingRow, CurrentlyPlaying, CurrentlyPlayingButton };
