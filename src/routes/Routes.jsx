import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import EditProfile from "../pages/EditProfile";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [

      // ---------- PUBLIC AUTH ----------
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },

      // ---------- PRIVATE ----------
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },

      {
        path: "edit-profile",
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ),
      },

      // ---------- PUBLIC NFC PROFILE (LAST) ----------
      { path: ":userId", element: <Profile /> },
    ],
  },
]);

export default router;