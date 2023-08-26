import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Search from "./pages/search/Search.page";
import GlobalStyles from "./styles/GlobalStyles";
import Game from "./pages/game/Game.page";
import AppLayout from "./ui/app-layout/AppLayout.component";
import Signup from "./pages/signup/Signup.page";
import ConfirmSignup from "./pages/confirm-signup/ConfirmSignup.page";
import Account from "./pages/account/Account.page";
import ResetPassword from "./pages/reset-password/ResetPassword.page";
import Login from "./pages/login/Login.page";
import AccountProfileDetailsSection from "./features/account/account-profile-details-section/AccountProfileDetailsSection.component";
import AccountAvatarSection from "./features/account/account-avatar-section/AccountAvatarSection.component";
import AccountHintsSection from "./features/account/account-hints-section/AccountHintsSection";
import ResetPasswordSection from "./features/account/reset-password-section/ResetPasswordSection.component";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="search" />} />
            <Route path="search" element={<Search />} />
            <Route path="game/:id" element={<Game />} />
            <Route path="/login" element={<Login />} />
            <Route element={<Account />}>
              <Route
                path="account/profile"
                element={<AccountProfileDetailsSection />}
              />
              <Route path="account/avatar" element={<AccountAvatarSection />} />
              <Route path="account/hints" element={<AccountHintsSection />} />
              <Route
                path="account/reset-password"
                element={<ResetPasswordSection />}
              />
            </Route>
          </Route>
          <Route path="signup" element={<Signup />} />
          <Route path="confirm-signup" element={<ConfirmSignup />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
