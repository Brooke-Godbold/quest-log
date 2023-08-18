import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Search from "./pages/search/Search.page";
import GlobalStyles from "./styles/GlobalStyles";
import Game from "./pages/game/Game.page";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/app-layout/AppLayout.component";

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
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
