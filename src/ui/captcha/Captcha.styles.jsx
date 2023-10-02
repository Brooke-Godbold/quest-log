import styled from 'styled-components';

const StyledCaptcha = styled.div`
  padding: 2.4rem 3.6rem;
  border-radius: 3px;
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);

  margin: 2.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ComplianceStatement = styled.div`
  & a {
    transition: all 0.3s;

    color: var(--color-brand-100);

    &:hover {
      color: var(--color-brand-800);
    }
  }
`;

export { StyledCaptcha, ComplianceStatement };
