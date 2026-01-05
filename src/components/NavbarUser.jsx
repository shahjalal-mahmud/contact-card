import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function NavbarUser() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      <div className="flex-1">
        <Link to={`/${user.uid}`} className="text-xl font-bold">
          MyBrand
        </Link>
      </div>
      <div className="flex-none gap-2">
        <Link to={`/${user.uid}`} className="btn btn-ghost">
          My Profile
        </Link>
        <Link to="/edit-profile" className="btn btn-ghost">
          Edit Profile
        </Link>
        <button onClick={logout} className="btn btn-error text-white">
          Logout
        </button>
      </div>
    </div>
  );
}
