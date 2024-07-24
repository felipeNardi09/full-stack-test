import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Beers from "./pages/Beers";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UnprotectedRoutes from "./components/UnprotectedRoutes";
import UnauthorizedRoutesLayout from "./components/UnauthorizedRoutesLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="min-h-screen">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <UnprotectedRoutes>
                  <UnauthorizedRoutesLayout />
                </UnprotectedRoutes>
              }
            >
              <Route index element={<Navigate replace to="/signup" />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
            </Route>

            <Route
              path="beers"
              element={
                <ProtectedRoutes>
                  <Beers />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
