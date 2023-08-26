import { Outlet } from "react-router-dom";
import Header from "../header/Header.component";
import { Main, StyledAppLayout } from "./AppLayout.styles";
import MobileNavigation from "../mobile-navigation/MobileNavigation.component";

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <MobileNavigation />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
