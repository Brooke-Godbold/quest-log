import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

const PostGameTagContainer = styled.div`
  width: 25rem;

  display: flex;

  @media (max-width: 50em) {
    justify-content: flex-start;
  }

  @media (max-width: 25em) {
    width: 100%;
  }
`;

const PostGameTag = styled(NavLink)`
  background-color: ${(props) =>
    (props.$isPersonalizable && props.$tertiaryColor) ||
    'var(--color-brand-700)'};

  color: ${(props) =>
    (props.$isPersonalizable && props.$secondaryColor) ||
    'var(--color-brand-200)'};

  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border: none;
  border-radius: 3px;
  font-size: 1.4rem;
  padding: 0.6rem 1.8rem;

  transition: all 0.3s;

  &:hover {
    transform: scale(105%);
  }
`;

export { PostGameTagContainer, PostGameTag };
