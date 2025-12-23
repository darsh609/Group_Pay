
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
    <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800 bg-bg"
    >
        <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Cred<span className="text-primary">Resolve</span>
      </h1>
      

      {loggedIn && (
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <span className="text-gray-300 text-sm">
              Welcome, <span className="font-semibold text-white">{user?.name}</span>
            </span>
          </div>

         
        </div>
      )}

      <div className="flex items-center gap-8">
        {loggedIn && (
          <>
            <button
              className="text-gray-300 hover:text-white transition-colors"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
            
            <button
              className="text-gray-300 hover:text-white transition-colors"
              onClick={() => navigate("/settlements")}
            >
              Settlement
            </button>

             <button
            className="bg-accent px-5 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            onClick={handleLogout}
          >
            Logout
          </button>
          </>

        )}

      </div>

    </nav>
  );
}

