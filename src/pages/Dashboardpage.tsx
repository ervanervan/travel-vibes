import { useState, useEffect } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  NavArrowLeft,
  NavArrowRight,
  LogOut,
  Message,
  Folder,
  Book,
  BookStack,
} from "iconoir-react";

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUsername(user.username || "Guest");
    setEmail(user.email || "No Email");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getTitle = () => {
    const currentPath = location.pathname;

    if (currentPath.includes("/dashboard/articles")) return "Articles";
    if (currentPath.includes("/dashboard/categories")) return "Categories";
    if (currentPath.includes("/dashboard/comments")) return "Comments";
    return "Dashboard";
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".relative")) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } sticky top-0 h-screen bg-gray-950 text-white/90 transition-all duration-300 hidden md:block`}
      >
        <div>
          <div
            className={`p-4 mt-4 flex items-center ${
              isSidebarOpen ? "justify-between" : "justify-center"
            }`}
          >
            <Link to="/dashboard">
              <h2
                className={`text-2xl font-pacifico ${
                  isSidebarOpen ? "block text-left" : "text-center hidden"
                }`}
              >
                Travel Vibes
              </h2>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`focus:outline-none ${
                isSidebarOpen ? "" : "absolute right-5 mt-4"
              }`}
            >
              {isSidebarOpen ? <NavArrowLeft /> : <NavArrowRight />}
            </button>
          </div>

          <nav className="mt-4 space-y-4 p-2">
            <Link
              to="/dashboard/articles"
              className={`flex items-center ${
                isSidebarOpen ? "" : "justify-center"
              } p-2.5 hover:bg-gray-900 rounded-lg`}
            >
              <Book width={20} />
              {isSidebarOpen && <span className="ml-4">Articles</span>}
            </Link>
            <Link
              to="/dashboard/articles-user"
              className={`flex items-center ${
                isSidebarOpen ? "" : "justify-center"
              } p-2.5 hover:bg-gray-900 rounded-lg`}
            >
              <BookStack width={20} />
              {isSidebarOpen && <span className="ml-4">Articles By User</span>}
            </Link>
            <Link
              to="/dashboard/categories"
              className={`flex items-center ${
                isSidebarOpen ? "" : "justify-center"
              } p-2.5 hover:bg-gray-900 rounded-lg`}
            >
              <Folder width={20} />
              {isSidebarOpen && <span className="ml-4">Categories</span>}
            </Link>
            <Link
              to="/dashboard/comments"
              className={`flex items-center ${
                isSidebarOpen ? "" : "justify-center"
              } p-2.5 hover:bg-gray-900 rounded-lg`}
            >
              <Message width={20} />
              {isSidebarOpen && <span className="ml-4">Comments</span>}
            </Link>
          </nav>
        </div>

        <div className="absolute bottom-4 p-2 w-full">
          <button
            onClick={handleLogout}
            className={`flex items-center ${
              isSidebarOpen ? "justify-start" : "justify-center"
            } w-full p-2.5 hover:bg-gray-900 rounded-lg`}
          >
            <LogOut width={20} />
            {isSidebarOpen && <span className="ml-4">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 ${isSidebarOpen ? "md:p-6" : "p-2 md:p-6"}
        `}
      >
        <header className="sticky top-6 bg-white shadow-md p-4 rounded-lg flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-950">{getTitle()}</h1>
          <div className="relative">
            {/* User Info */}
            <div
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => setIsPopupOpen(!isPopupOpen)} // Toggle Popup
            >
              <span className="text-gray-600">{username}</span>
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </div>

            {/* Popup */}
            {isPopupOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
                <div className="p-4">
                  <p className="text-gray-800 font-medium">Hi, {username}</p>
                  <p className="text-gray-600 text-sm">{email}</p>
                </div>
                <hr />
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-gray-100 rounded-b-lg"
                  onClick={handleLogout}
                >
                  <LogOut />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Render child content */}
        <section className="mt-6">
          <Outlet />
        </section>
      </main>
    </section>
  );
};

export default DashboardPage;
