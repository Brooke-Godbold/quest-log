import PropTypes from "prop-types";

import { StyledButton, StyledLinkButton } from "./Button.styles";

function Button({ isLight, isLink = false, onClick, href, children }) {
  if (isLink)
    return (
      <StyledLinkButton href={href} target="_blank" $light={isLight}>
        {children}
      </StyledLinkButton>
    );

  return (
    <StyledButton onClick={onClick} $light={isLight}>
      {children}
    </StyledButton>
  );
}

export default Button;

Button.propTypes = {
  isLight: PropTypes.bool.isRequired,
  isLink: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};
