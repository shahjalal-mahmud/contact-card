import { Link } from "react-router-dom";

export default function NavbarGuest() {
  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      <div className="flex-1">
        <Link to="/login" className="text-xl font-bold">
          MyBrand
        </Link>
      </div>
      <div className="flex-none gap-2">
        <Link to="/login" className="btn btn-ghost">
          Login
        </Link>
        <Link to="/signup" className="btn btn-primary">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
