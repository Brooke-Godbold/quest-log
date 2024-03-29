import PropTypes from "prop-types";

import { useUser } from "../../../query/auth/useUser";
import { useProfileByUser } from "../../../query/profile/useProfileByUser";

import Spinner from "../../../ui/spinner/Spinner";

import {
  AccountGridContainer,
  AccountSection,
  AccountSectionButtons,
  AccountSectionButtonsContainer,
  AccountSectionHeading,
  AccountSectionNavLink,
  StyledAccountLayout,
} from "./AccountLayout.styles";
import { usePageTitle } from "../../../hooks/usePageTitle";

function AccountLayout({ children }) {
  usePageTitle("Account");

  const { user } = useUser();

  const { isGettingProfile } = useProfileByUser(user?.id);

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
              <AccountSectionNavLink to="account/privacy">
                Privacy
              </AccountSectionNavLink>
              <AccountSectionNavLink to="account/users?view=following">
                Following
              </AccountSectionNavLink>
              <AccountSectionNavLink to="account/users?view=blocked">
                Blocked
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
