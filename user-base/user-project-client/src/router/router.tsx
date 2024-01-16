import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout";
import { ErrorPage } from "../pages/ErrorPage";
import { Home } from "../pages/Home";
import { Auth } from "../pages/Auth";
import { Users } from "../components/UserList/UserList";
import { Profile } from "../components/Profile/Profile";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
      {
        path: "users",
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
