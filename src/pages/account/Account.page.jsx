import { Outlet } from "react-router-dom";

import AccountLayout from "../../features/account/account-layout/AccountLayout.component";

import { StyledAccount } from "./Account.styles";

function Account() {
  return (
    <StyledAccount>
      <AccountLayout>
        <Outlet />
      </AccountLayout>
    </StyledAccount>
  );
}

export default Account;
