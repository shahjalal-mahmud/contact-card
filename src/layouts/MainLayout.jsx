import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NavbarGuest from "../components/NavbarGuest";
import NavbarUser from "../components/NavbarUser";

export default function MainLayout() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Show navbar depending on auth status */}
      {user ? <NavbarUser /> : <NavbarGuest />}
      
      {/* Page content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
