import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="p-4">
      <nav className="mb-4 flex gap-4">
        <Link to="/" className="btn btn-primary">Home</Link>
        <Link to="/profile/demoUser" className="btn btn-secondary">Profile</Link>
      </nav>
      <Outlet />
    </div>
  );
}
