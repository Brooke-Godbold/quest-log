import { styled } from "styled-components";

const StyledTextCount = styled.p`
  font-size: 1.4rem;
  grid-column: 1 / -1;
  justify-self: end;
  align-self: flex-end;
  margin-top: 0.8rem;
  margin-right: 1.6rem;
`;

const CurrentTextCount = styled.span`
  color: ${(props) => (props.$valid ? "inherit" : "red")};
`;

export { StyledTextCount, CurrentTextCount };
