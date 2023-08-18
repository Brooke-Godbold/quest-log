import { Outlet } from "react-router-dom";
import Header from "../header/Header.component";
import { StyledAppLayout } from "./AppLayout.styles";

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Outlet />
    </StyledAppLayout>
  );
}

export default AppLayout;
