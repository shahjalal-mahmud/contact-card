import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  { name: "Profile", path: (username) => `/${username}` },
  { name: "Edit Profile", path: () => "/edit-profile" },
];

export default function ProfileTabs() {
  const location = useLocation();
  const { username } = useParams();

  // Temporary fallback for dev as per your code
  const currentUsername = username || "bzKVfoSHdBQD09XhK9A6ddjTMZF2";

  return (
    <div className="relative flex p-1 bg-gray-100/50 dark:bg-zinc-800/50 backdrop-blur-md rounded-2xl w-full max-w-sm mb-8">
      {tabs.map((tab) => {
        const targetPath = tab.path(currentUsername);
        const isActive = location.pathname === targetPath;

        return (
          <Link
            key={tab.name}
            to={targetPath}
            className={`relative flex-1 text-center py-2.5 text-sm font-medium transition-colors duration-300 z-10 ${
              isActive ? "text-primary-content" : "text-base-content/60 hover:text-base-content"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/20"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <span className="relative z-20">{tab.name}</span>
          </Link>
        );
      })}
    </div>
  );
}