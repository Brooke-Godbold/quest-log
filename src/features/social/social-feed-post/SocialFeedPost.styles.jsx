import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { CommonItem } from '../../../styles/GlobalStyles';

const QuoteBlock = styled.button`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  width: 50%;
  margin: 2.4rem 1.2rem 1.2rem 1.2rem;
  padding: 1.2rem;
  border-radius: 5px;
  border: none;

  font-size: 1.4rem;
  font-style: italic;

  color: var(--color-brand-300);
  background-color: var(--color-brand-600);

  & p,
  & h3 {
    cursor: pointer;
  }

  & p {
    text-align: right;
    margin-left: 5rem;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 35em) {
    width: 90%;
    margin: 2.4rem 0rem 0rem 0rem;
  }
`;

const StyledSocialFeedPost = styled.div`
  ${CommonItem}

  background-color: ${(props) => props.$isPersonalizable && props.$mainColor};

  &:hover {
    background-color: ${(props) => props.$isPersonalizable && props.$mainColor};
    filter: ${(props) =>
      props.$isPersonalizable && props.$mainColor && 'brightness(125%)'};

    & ${QuoteBlock} {
      background-color: var(--color-brand-500);
    }
  }
`;

const PostContent = styled.p`
  color: ${(props) => props.$isPersonalizable && props.$tertiaryColor};
`;

const PostDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 1.2rem;

  @media (max-width: 50em) {
    flex-direction: column;
    gap: 1.6rem;
    align-items: flex-start;
  }
`;

const PostCreatedTime = styled.p`
  color: ${(props) => props.$isPersonalizable && props.$tertiaryColor};

  font-size: 1.2rem;
  font-weight: 700;
`;

const PostButtonsContainer = styled.div`
  position: absolute;
  top: 2.4rem;
  right: 2.4rem;

  display: flex;
  gap: 1.6rem;
  align-items: center;

  & svg:first-child {
    color: ${(props) => props.$isPersonalizable && props.$tertiaryColor};

    border: ${(props) =>
      (props.$isPersonalizable && `1px solid ${props.$tertiaryColor}`) ||
      '1px solid var(--color-brand-600)'};

    transform: scale(225%);
    margin-right: 2.4rem;
    border-radius: 50%;
  }

  @media (max-width: 35em) {
    margin-top: 1.2rem;
    position: static;
    justify-content: space-between;

    & svg:first-child {
      display: none;
    }
  }
`;

const RepliesCount = styled.p`
  color: ${(props) => props.$isPersonalizable && props.$tertiaryColor};

  align-self: center;
  border: 2px solid rgba(34, 34, 34, 0.1);
  padding: 0.6rem 1.8rem;
  font-size: 1.8rem;
  font-weight: 700;
  border-radius: 3px;

  @media (max-width: 35em) {
    font-size: 1.2rem;
    padding: 0.6rem 1.4rem;
  }
`;

const ReplyButton = styled.button`
  background-color: ${(props) =>
    (props.$isPersonalizable && props.$tertiaryColor) ||
    'var(--color-brand-600)'};

  color: ${(props) =>
    (props.$isPersonalizable && props.$secondaryColor) ||
    'var(--color-brand-200)'};

  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border: none;
  border-radius: 3px;
  font-size: 1.8rem;
  padding: 1.2rem 1.8rem;

  transition: all 0.3s;

  &:hover {
    transform: scale(105%);
  }
`;

const DetailLink = styled(NavLink)`
  background-color: ${(props) =>
    (props.$isPersonalizable && props.$tertiaryColor) ||
    'var(--color-brand-600)'};

  color: ${(props) =>
    (props.$isPersonalizable && props.$secondaryColor) ||
    'var(--color-brand-200)'};

  box-shadow: 0px 0px 5px 3px rgb(31, 31, 31, 0.1);
  border-radius: 3px;
  font-size: 1.8rem;
  padding: 1.2rem 1.8rem;

  transition: all 0.3s;

  &:hover {
    transform: scale(105%);
  }
`;

export {
  StyledSocialFeedPost,
  PostCreatedTime,
  PostContent,
  PostDetails,
  ReplyButton,
  PostButtonsContainer,
  DetailLink,
  RepliesCount,
  QuoteBlock,
};
