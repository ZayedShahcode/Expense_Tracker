import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useAuth(); // Extract auth state

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Handle Profile Icon Click
  const handleClick = () => {
    if (auth) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-gray-900 border-b border-gray-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-[#0092FB] flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold text-white">Expencier</span>
                </Link>
              </div>

              <div className="flex items-center space-x-8">
                <Link
                    to="/"
                    className={`text-sm font-medium transition-colors ${
                        isActive("/")
                            ? "text-[#0092FB]"
                            : "text-gray-300 hover:text-white"
                    }`}
                >
                  Home
                </Link>
                <Link
                    to="/dashboard"
                    className={`text-sm font-medium transition-colors ${
                        isActive("/dashboard")
                            ? "text-[#0092FB]"
                            : "text-gray-300 hover:text-white"
                    }`}
                >
                  Dashboard
                </Link>
                <Link
                    to="/reports"
                    className={`text-sm font-medium transition-colors ${
                        isActive("/reports")
                            ? "text-[#0092FB]"
                            : "text-gray-300 hover:text-white"
                    }`}
                >
                  Reports
                </Link>
                <Link
                    to="/add"
                    className={`text-sm font-medium transition-colors ${
                        isActive("/add")
                            ? "text-[#0092FB]"
                            : "text-gray-300 hover:text-white"
                    }`}
                >
                  Add Expense
                </Link>
              </div>

              <div className="flex items-center">
                <button onClick={handleClick} className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </button>
                {auth && (
                    <button onClick={handleLogout} className="w-full p-2 text-sm bg-red-600 text-black ml-4 hover:underline rounded-md">
                      Logout
                    </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>

        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-gray-500">
              © 2025 Expencier. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
  );
};
