import { styled } from "styled-components";

const StyledHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 3.6rem 4.8rem;
`;

const HeaderLogo = styled.div``;

const HeaderLinks = styled.div`
  display: flex;
  gap: 4.8rem;
  font-size: 2.4rem;
`;

const HeaderButton = styled.button`
  border: none;
  background-color: transparent;
`;

export { StyledHeader, HeaderLogo, HeaderLinks, HeaderButton };
