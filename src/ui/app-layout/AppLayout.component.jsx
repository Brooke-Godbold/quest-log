import { Outlet } from "react-router-dom";
import Header from "../header/Header.component";
import { Main, StyledAppLayout } from "./AppLayout.styles";

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
