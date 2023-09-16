import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import GlobalStyles from './styles/GlobalStyles';
import Game from './pages/game/Game.page';
import AppLayout from './ui/app-layout/AppLayout.component';
import Signup from './pages/signup/Signup.page';
import ConfirmSignup from './pages/confirm-signup/ConfirmSignup.page';
import Account from './pages/account/Account.page';
import ResetPassword from './pages/reset-password/ResetPassword.page';
import Login from './pages/login/Login.page';
import User from './pages/user/User.page';
import AccountProfileDetailsSection from './features/account/account-profile-details-section/AccountProfileDetailsSection.component';
import AccountAvatarSection from './features/account/account-avatar-section/AccountAvatarSection.component';
import AccountHintsSection from './features/account/account-hints-section/AccountHintsSection';
import ResetPasswordSection from './features/account/reset-password-section/ResetPasswordSection.component';
import SocialFeed from './pages/social-feed/SocialFeed.page';
import SocialPost from './pages/social-post/SocialPost.page';
import NotFound from './pages/not-found/NotFound.page';
import { Toaster, toast } from 'react-hot-toast';
import Error from './pages/error/Error.page';
import Messages from './pages/messages/Messages.component';
import ProtectedRoute from './ui/protected-route/ProtectedRoute.component';
import { ConversationsProvider } from './contexts/ConversationsContext';
import AccountPrivacySection from './features/account/account-privacy-section/AccountPrivacySection.component';
import AccountUserSection from './features/account/account-user-section/AccountUserSection.component';
import Notification from './ui/notification/Notification.component';
import { LocationsProvider } from './contexts/LocationsContext';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta.errorMessage) {
        toast.error((t) => (
          <Notification toast={t} text={query.meta.errorMessage} />
        ));
      } else {
        toast.error((t) => (
          <Notification
            toast={t}
            text={`Oops! That wasn't supposed to happen: ${error.message}`}
          />
        ));
      }
    },
  }),

  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <Toaster
        toastOptions={{
          style: {
            boxShadow: '0px 0px 7px 1px rgb(31, 31, 31, 0.2)',
            backgroundColor: 'var(--color-brand-700)',
            color: 'var(--color-brand-300)',
            border: 'double 7px #dfbb58c1',
          },
          error: {
            style: {
              backgroundColor: 'var(--color-red-800)',
              color: 'var(--color-red-100)',
              border: 'double 7px var(--color-red-400)',
            },
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <LocationsProvider>
                <ConversationsProvider>
                  <AppLayout />
                </ConversationsProvider>
              </LocationsProvider>
            }
          >
            <Route index element={<Navigate replace to="social/feed" />} />
            <Route
              path="game/:id"
              element={<Game />}
              errorElement={<Error />}
            />
            <Route
              path="social/:username"
              element={<User />}
              errorElement={<Error />}
            />
            <Route
              path="social/feed"
              element={<SocialFeed />}
              errorElement={<Error />}
            />
            <Route
              path="social/post/:postId"
              element={<SocialPost />}
              errorElement={<Error />}
            />
            <Route
              path="messages"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
              errorElement={<Error />}
            />
            <Route
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            >
              <Route
                path="account/profile"
                element={<AccountProfileDetailsSection />}
                errorElement={<Error />}
              />
              <Route
                path="account/avatar"
                element={<AccountAvatarSection />}
                errorElement={<Error />}
              />
              <Route
                path="account/privacy"
                element={<AccountPrivacySection />}
                errorElement={<Error />}
              />
              <Route
                path="account/users"
                element={<AccountUserSection />}
                errorElement={<Error />}
              />
              <Route
                path="account/hints"
                element={<AccountHintsSection />}
                errorElement={<Error />}
              />
              <Route
                path="account/reset-password"
                element={<ResetPasswordSection />}
                errorElement={<Error />}
              />
            </Route>
          </Route>
          <Route path="signup" element={<Signup />} errorElement={<Error />} />
          <Route path="login" element={<Login />} errorElement={<Error />} />
          <Route
            path="confirm-signup"
            element={<ConfirmSignup />}
            errorElement={<Error />}
          />
          <Route
            path="reset-password"
            element={<ResetPassword />}
            errorElement={<Error />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
