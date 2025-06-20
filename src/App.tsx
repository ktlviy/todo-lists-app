import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import { useAuth } from "@/context/AuthContext";
import { RouteConfig } from "./types";

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[linear-gradient(135deg,#ffe6e6_0%,#e6e6ff_100%)] font-poppins">
        <span className="text-[#F79489] text-shadow text-lg font-medium">
          Loading...
        </span>
      </div>
    );
  }
  if (user) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

const routes: RouteConfig[] = [
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
    isPublic: true,
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
    isPublic: true,
  },
  { path: "/dashboard", element: <DashboardPage />, isPublic: false },
  { path: "*", element: <Navigate to="/dashboard" replace /> },
];

const App = () => (
  <BrowserRouter>
    <Routes>
      {routes.map(({ path, element, isPublic }) =>
        isPublic ? (
          <Route key={path} path={path} element={element} />
        ) : (
          <Route key={path} element={<ProtectedRoute />}>
            <Route path={path} element={element} />
          </Route>
        )
      )}
    </Routes>
  </BrowserRouter>
);

export default App;
