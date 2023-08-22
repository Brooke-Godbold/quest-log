import { styled } from "styled-components";

const StyledAccountProfileDetails = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 5.4rem;
`;

const ProfileDetailsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 0 5.4rem;
  align-items: center;
  margin-left: 10rem;
`;

const ProfileDetailsLabel = styled.label`
  font-size: 2.4rem;
`;

const ProfileDetailsErrorContainer = styled.div`
  grid-column: 2;
`;

export {
  StyledAccountProfileDetails,
  ProfileDetailsRow,
  ProfileDetailsErrorContainer,
  ProfileDetailsLabel,
};
