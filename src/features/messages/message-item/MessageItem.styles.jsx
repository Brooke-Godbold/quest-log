import { styled } from "styled-components";

const StyledMessageItem = styled.div`
  width: 60%;
  padding: 1.2rem;

  background-color: var(--color-brand-500);
  border-radius: 5px;
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);

  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  align-self: ${(props) => (props.$isSender ? "flex-start" : "flex-end")};

  transition: all 0.3s;

  &:hover {
    background-color: var(--color-brand-400);
  }

  @media (max-width: 30em) {
    font-size: 1.4rem;
    width: 75%;
  }
`;

const MessageTime = styled.p`
  font-size: 1.2rem;

  align-self: flex-end;
`;

export { StyledMessageItem, MessageTime };
