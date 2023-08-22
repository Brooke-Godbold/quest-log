import { useEffect, useState } from "react";
import Button from "../../../ui/button/Button.component";
import {
  AccountGridContainer,
  AccountSection,
  AccountSectionButtons,
  AccountSectionButtonsContainer,
  AccountSectionHeading,
  StyledAccountLayout,
} from "./AccountLayout.styles";
import { useUser } from "../../auth/useUser";
import { useNavigate } from "react-router-dom";
import { useHint } from "../../hint/hint-list/useHint";
import Spinner from "../../../ui/spinner/Spinner";
import { useVotesByUser } from "./useVotesByUser";
import { useProfileByUser } from "./useProfileByUser";
import { useHintByHintIds } from "./useHintByHintIds";
import AccountAvatarSection from "../account-avatar-section/AccountAvatarSection.component";
import AccountProfileDetailsSection from "../account-profile-details-section/AccountProfileDetailsSection.component";
import AccountHintsSection from "../account-hints-section/AccountHintsSection";
import ResetPasswordSection from "../reset-password-section/ResetPasswordSection.component";

function AccountLayout() {
  const { isGettingUser, isAuthenticated, user } = useUser();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("profile");

  const [hintIds, setHintIds] = useState([]);

  const {
    isLoading: isLoadingHints,
    isFetching: isFetchingHints,
    hintData: userHints,
  } = useHint({
    by: "userId",
    id: user ? user.id : null,
  });

  const { isLoading: isLoadingVotes, voteData: userVotes } = useVotesByUser(
    user ? user.id : null
  );

  const { isGettingProfile } = useProfileByUser(user ? user.id : null);

  const {
    isLoading: isLoadingVotedHints,
    isFetching: isFetchingVotedHints,
    hintData: votedHints,
  } = useHintByHintIds(hintIds);

  //console.log("USER HINTS: ", userHints);
  //console.log("USER VOTES: ", userVotes);
  //console.log("USER PROFILE: ", profile);
  //console.log("VOTED HINTS", votedHints);

  const isLoading =
    isLoadingHints ||
    isFetchingHints ||
    isLoadingVotes ||
    isGettingProfile ||
    isLoadingVotedHints ||
    isFetchingVotedHints;

  useEffect(
    function () {
      if (!isAuthenticated && !isGettingUser)
        navigate("/search", { replace: true });
    },
    [isAuthenticated, navigate, isGettingUser]
  );

  useEffect(
    function () {
      if (!userVotes) return;

      let hintIds = [];

      switch (activeSection) {
        case "upvotes":
          hintIds = userVotes
            .filter((vote) => vote.isPositive)
            .map((vote) => vote.hintId);
          setHintIds(hintIds);
          break;
        case "downvotes":
          hintIds = userVotes
            .filter((vote) => !vote.isPositive)
            .map((vote) => vote.hintId);
          setHintIds(hintIds);
          break;
        default:
          setHintIds([]);
      }
    },
    [activeSection, userVotes]
  );

  return (
    <StyledAccountLayout>
      <AccountSectionHeading>Account</AccountSectionHeading>
      {isLoading ? (
        <Spinner />
      ) : (
        <AccountGridContainer>
          <AccountSectionButtons>
            <AccountSectionButtonsContainer>
              <Button onClick={() => setActiveSection("profile")}>
                Profile Details
              </Button>
              <Button onClick={() => setActiveSection("avatar")}>Avatar</Button>
            </AccountSectionButtonsContainer>
            <AccountSectionButtonsContainer>
              <Button onClick={() => setActiveSection("userHints")}>
                My Hints
              </Button>
              <Button onClick={() => setActiveSection("upvotes")}>
                My Upvotes
              </Button>
              <Button onClick={() => setActiveSection("downvotes")}>
                My Downvotes
              </Button>
            </AccountSectionButtonsContainer>
            <AccountSectionButtonsContainer>
              <Button onClick={() => setActiveSection("resetPassword")}>
                Reset Password
              </Button>
            </AccountSectionButtonsContainer>
          </AccountSectionButtons>
          <AccountSection>
            {activeSection === "profile" && <AccountProfileDetailsSection />}

            {activeSection === "avatar" && <AccountAvatarSection />}

            {activeSection === "userHints" && (
              <AccountHintsSection hintsList={userHints} user={user} />
            )}

            {(activeSection === "upvotes" || activeSection === "downvotes") && (
              <AccountHintsSection hintsList={votedHints} user={user} />
            )}

            {activeSection === "resetPassword" && <ResetPasswordSection />}
          </AccountSection>
        </AccountGridContainer>
      )}
    </StyledAccountLayout>
  );
}

export default AccountLayout;
