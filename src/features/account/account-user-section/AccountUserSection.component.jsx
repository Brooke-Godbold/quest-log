import { useSearchParams } from "react-router-dom";
import {
  AccountUserItem,
  AccountUserList,
  AccountUsersHeading,
  StyledAccountUserSection,
} from "./AccountUserSection.styles";
import { useProfileByUser } from "../account-layout/useProfileByUser";
import { useUser } from "../../auth/useUser";
import AvatarNavLink from "../../../ui/avatar-nav-link/AvatarNavLink.component";
import { useProfilesByValues } from "./useProfilesByValues";

function AccountUserSection() {
  const [searchParams] = useSearchParams();

  const { user } = useUser();
  const { profile } = useProfileByUser(user?.id);

  const { profiles: followers } = useProfilesByValues({
    userId: user?.id,
    column: "following",
    values: [user?.id],
  });

  return (
    <StyledAccountUserSection
      $columns={searchParams.get("view") === "following" ? 2 : 1}
    >
      {searchParams.get("view") === "following" ? (
        <>
          <AccountUsersHeading>Followed</AccountUsersHeading>
          <AccountUsersHeading>Followers</AccountUsersHeading>
          <AccountUserList>
            {profile?.following.map((following) => (
              <AccountUserItem key={following}>
                <AvatarNavLink userId={following} />
              </AccountUserItem>
            ))}
          </AccountUserList>
          <AccountUserList>
            {followers?.map((follower) => (
              <AccountUserItem key={follower.userId}>
                <AvatarNavLink userId={follower.userId} />
              </AccountUserItem>
            ))}
          </AccountUserList>
        </>
      ) : (
        <>
          <AccountUsersHeading>Blocked Users</AccountUsersHeading>
          <AccountUserList>
            {profile?.blocked.map((blocked) => (
              <AccountUserItem key={blocked}>
                <AvatarNavLink userId={blocked} />
              </AccountUserItem>
            ))}
          </AccountUserList>
        </>
      )}
    </StyledAccountUserSection>
  );
}

export default AccountUserSection;
