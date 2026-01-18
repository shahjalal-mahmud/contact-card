import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ProfileTabs from "../components/ProfileTabs";

export default function MainLayout() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col items-center bg-base-100 selection:bg-primary/30">
      <header className="pt-10 w-full flex flex-col items-center">
        {/* Extracted Component */}
        <ProfileTabs />
      </header>

      <main className="flex-1 w-full max-w-4xl px-4 pb-20">
        <Outlet />
      </main>

      {user && (
        <footer className="fixed bottom-6 right-6">
          <button 
            onClick={logout} 
            className="btn btn-circle btn-ghost bg-base-200/50 backdrop-blur shadow-sm hover:bg-error/10 hover:text-error transition-all"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </footer>
      )}
    </div>
  );
}