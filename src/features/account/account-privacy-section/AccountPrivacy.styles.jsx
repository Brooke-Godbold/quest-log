import { styled } from "styled-components";

const StyledAccountPrivacySection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
`;

const PrivacySelect = styled.select`
  padding: 1rem 2rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-brand-50);
  color: var(--color-brand-600);
  width: 100%;
`;

export { StyledAccountPrivacySection, PrivacySelect };
