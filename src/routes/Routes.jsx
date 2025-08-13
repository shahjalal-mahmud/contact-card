import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import EditProfile from "../pages/EditProfile";
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from "../pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/landing-page", element: <LandingPage />},
      { path: "/profile/:username", element: <Profile /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { 
        path: "/edit-profile", 
        element: (
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        ) 
      },
    ],
  },
]);

export default router;