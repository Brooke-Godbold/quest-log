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
            <Route path="account" element={<Account />} />
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
