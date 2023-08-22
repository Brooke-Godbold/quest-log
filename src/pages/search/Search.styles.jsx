import { styled } from "styled-components";

const StyledSearch = styled.div`
  background-color: var(--color-brand-100);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15rem;

  @media (max-width: 45em) {
    margin-top: 7.4rem;
  }
`;

const TitleImage = styled.img`
  height: 35rem;
  width: auto;

  @media (max-width: 45em) {
    max-width: 80%;
    height: auto;
  }
`;

const Title = styled.h1`
  font-size: 12.8rem;
  margin-top: 14rem;
  color: var(--color-brand-400);
`;

export { StyledSearch, Title, TitleContainer, TitleImage };
