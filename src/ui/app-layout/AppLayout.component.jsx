import { Outlet } from "react-router-dom";

import Navigation from "../navigation/Navigation.component";

import { Main, StyledAppLayout } from "./AppLayout.styles";

function AppLayout() {
  return (
    <StyledAppLayout>
      <Navigation />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
