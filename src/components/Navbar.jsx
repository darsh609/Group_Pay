
import { useNavigate } from "react-router-dom";
import { isLoggedIn, logout, getLoggedInUser } from "../utils/auth";
export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const user = getLoggedInUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-bg/80 border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary via-purple-500 to-accent rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform shadow-lg shadow-primary/20">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Group<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Pay</span>
              </h1>
              <p className="text-xs text-gray-500 -mt-0.5">Split expenses, settle debts</p>
            </div>
          </div>

          {/* Navigation & User Section */}
          {loggedIn && (
            <div className="flex items-center gap-6">
              {/* Nav Links */}
              <div className="flex items-center gap-1 bg-gray-800/30 rounded-lg p-1">
                <button
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </button>
                <button
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all"
                  onClick={() => navigate("/settlements")}
                >
                  Settlements
                </button>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-full border border-gray-700/50">
                <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/30">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-white">
                  {user?.name}
                </span>
              </div>

              {/* Logout Button */}
              <button
                className="px-5 py-2 rounded-lg font-medium bg-gradient-to-r from-accent to-orange-600 hover:from-orange-600 hover:to-accent transition-all transform hover:scale-105 shadow-lg shadow-accent/20"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}