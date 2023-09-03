import { styled } from "styled-components";

const StyledMessagesSender = styled.button`
  position: relative;

  width: 100%;
  height: 12.5rem;
  padding: 2.4rem;

  border: ${(props) =>
    props.$active ? "3px solid var(--color-brand-200)" : "none"};

  background-color: var(--color-brand-500);
  border-radius: 5px;
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);

  display: flex;
  justify-content: space-between;

  flex-shrink: 0;

  transition: all 0.3s;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: var(--color-brand-400);
  }

  @media (max-width: 75em) {
    padding: 1.2rem;
  }

  @media (max-width: 55em) {
    width: 20rem;
    height: 10rem;
  }
`;

const SenderMessageDetails = styled.div`
  position: absolute;
  right: 2rem;
  bottom: 2rem;

  align-self: flex-end;

  display: flex;
  align-items: center;
  gap: 1.8rem;

  & p {
    font-size: 1.8rem;
    font-weight: 700;
  }

  & svg {
    transform: scale(150%);
    pointer-events: none;
  }

  @media (max-width: 55em) {
    right: 1rem;
    bottom: 1rem;
    gap: 0.8rem;

    & p {
      font-size: 1.2rem;
      font-weight: 700;
    }

    & svg {
      transform: scale(100%);
      pointer-events: none;
    }
  }
`;

export { StyledMessagesSender, SenderMessageDetails };
