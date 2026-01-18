import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import EditProfile from "../pages/EditProfile";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Redirect root to a default profile or login
      { path: "", element: <Navigate to="/login" replace /> },
      
      { path: "login", element: <Login /> },
      
      {
        path: "edit-profile",
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },

      { path: ":username", element: <Profile /> },
    ],
  },
]);

export default router;