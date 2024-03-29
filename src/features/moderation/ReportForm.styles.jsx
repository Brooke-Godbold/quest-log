import styled from 'styled-components';
import { CommonScrollBar } from '../../styles/GlobalStyles';

const StyledReportForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  @media (max-width: 75em) {
    width: 50vw;
  }

  @media (max-width: 50em) {
    width: 75vw;
  }

  @media (max-width: 25em) {
    width: 85vw;

    font-size: 1.2rem;
  }
`;

const ReportSection = styled.div`
  & select {
    width: 100%;
  }
`;

const ReportTextField = styled.textarea`
  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border: none;
  border-radius: 3px;
  background-color: var(--color-brand-50);
  color: var(--color-brand-600);
  height: 25rem;
  width: 100%;
  padding: 1.6rem;

  ${CommonScrollBar}
`;

export { StyledReportForm, ReportTextField, ReportSection };
