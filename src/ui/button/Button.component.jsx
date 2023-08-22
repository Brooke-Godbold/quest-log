import PropTypes from "prop-types";

import { StyledButton, StyledLinkButton } from "./Button.styles";

function Button({
  isLight = false,
  isLink = false,
  disabled = false,
  onClick,
  href,
  children,
}) {
  if (isLink)
    return (
      <StyledLinkButton href={href} target="_blank" $light={isLight}>
        {children}
      </StyledLinkButton>
    );

  return (
    <StyledButton disabled={disabled} onClick={onClick} $light={isLight}>
      {children}
    </StyledButton>
  );
}

export default Button;

Button.propTypes = {
  isLight: PropTypes.bool,
  isLink: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};
