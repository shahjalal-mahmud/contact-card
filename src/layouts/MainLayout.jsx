import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function MainLayout() {
  const { user, profile } = useContext(AuthContext);

  return (
    <div className="p-4">
      <nav className="mb-4 flex gap-4">
        <Link to="/" className="btn btn-primary">Home</Link>
        
        {user ? (
          <>
            <Link 
              to={`/profile/${profile?.username || user.uid}`} 
              className="btn btn-secondary"
            >
              My Profile
            </Link>
            <Link to="/edit-profile" className="btn btn-secondary">
              Edit Profile
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-secondary">Login</Link>
            <Link to="/signup" className="btn btn-secondary">Signup</Link>
          </>
        )}
      </nav>
      <Outlet />
    </div>
  );
}