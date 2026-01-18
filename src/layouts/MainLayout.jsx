import { Outlet, Link, useLocation, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function MainLayout() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const { username } = useParams();

  // Determine the base path for navigation
  // If we're on a profile, use that username, otherwise default to a login state
  const profilePath = username ? `/${username}` : "/bzKVfoSHdBQD09XhK9A6ddjTMZF2"; // Temporary only for dev
  const editPath = "/edit-profile";

  return (
    <div className="min-h-screen flex flex-col items-center bg-base-100">
      {/* Tabs Container */}
      <div role="tablist" className="tabs tabs-boxed my-6 w-full max-w-md">
        <Link
          to={profilePath}
          role="tab"
          className={`tab ${location.pathname === `/${username}` ? "tab-active" : ""}`}
        >
          Profile
        </Link>
        <Link
          to={editPath}
          role="tab"
          className={`tab ${location.pathname === "/edit-profile" ? "tab-active" : ""}`}
        >
          Edit Profile
        </Link>
      </div>

      {/* Page content */}
      <div className="flex-1 w-full max-w-4xl px-4">
        <Outlet />
      </div>

      {/* Optional: Logout button floating or at bottom if logged in */}
      {user && (
        <button 
          onClick={() => {logout()}} 
          className="btn btn-ghost btn-sm mb-4 opacity-50 hover:opacity-100"
        >
          Logout
        </button>
      )}
    </div>
  );
}