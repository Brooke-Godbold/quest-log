import PropTypes from "prop-types";
import { useEffect } from "react";
import {
  AccountGridContainer,
  AccountSection,
  AccountSectionButtons,
  AccountSectionButtonsContainer,
  AccountSectionHeading,
  AccountSectionNavLink,
  StyledAccountLayout,
} from "./AccountLayout.styles";
import { useUser } from "../../auth/useUser";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../ui/spinner/Spinner";
import { useProfileByUser } from "./useProfileByUser";

function AccountLayout({ children }) {
  const { isGettingUser, isAuthenticated, user } = useUser();
  const navigate = useNavigate();

  const { isGettingProfile } = useProfileByUser(user ? user.id : null);

  useEffect(
    function () {
      if (!isAuthenticated && !isGettingUser)
        navigate("/search", { replace: true });
    },
    [isAuthenticated, navigate, isGettingUser]
  );

  return (
    <StyledAccountLayout>
      <AccountSectionHeading>Account</AccountSectionHeading>
      {isGettingProfile ? (
        <Spinner />
      ) : (
        <AccountGridContainer>
          <AccountSectionButtons>
            <AccountSectionButtonsContainer>
              <AccountSectionNavLink to="account/profile">
                Profile Details
              </AccountSectionNavLink>
              <AccountSectionNavLink to="account/avatar">
                Avatar
              </AccountSectionNavLink>
            </AccountSectionButtonsContainer>
            <AccountSectionButtonsContainer>
              <AccountSectionNavLink to="account/hints?type=user">
                My Hints
              </AccountSectionNavLink>
              <AccountSectionNavLink to="account/hints?type=upvotes">
                My Upvotes
              </AccountSectionNavLink>
              <AccountSectionNavLink to="account/hints?type=downvotes">
                My Downvotes
              </AccountSectionNavLink>
            </AccountSectionButtonsContainer>
            <AccountSectionButtonsContainer>
              <AccountSectionNavLink to="account/reset-password">
                Reset Password
              </AccountSectionNavLink>
            </AccountSectionButtonsContainer>
          </AccountSectionButtons>
          <AccountSection>{children}</AccountSection>
        </AccountGridContainer>
      )}
    </StyledAccountLayout>
  );
}

AccountLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AccountLayout;
