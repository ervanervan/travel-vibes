import { useState } from "react";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-gray-950 text-white transition-all duration-300`}
      >
        <div className="p-4 flex items-center justify-between">
          <h2
            className={`text-xl font-semibold ${
              isSidebarOpen ? "block" : "hidden"
            }`}
          >
            Dashboard
          </h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="focus:outline-none"
          >
            {isSidebarOpen ? "←" : "→"}
          </button>
        </div>
        <nav className="mt-4 space-y-4 p-2">
          <Link
            to="/articles"
            className="flex items-center p-2.5 hover:bg-gray-700 rounded-lg"
          >
            📝
            {isSidebarOpen && <span className="ml-4">Articles</span>}
          </Link>
          <Link
            to="/categories"
            className="flex items-center p-2.5 hover:bg-gray-700 rounded-lg"
          >
            📂
            {isSidebarOpen && <span className="ml-4">Categories</span>}
          </Link>
          <Link
            to="/comments"
            className="flex items-center p-2.5 hover:bg-gray-700 rounded-lg"
          >
            💬
            {isSidebarOpen && <span className="ml-4">Comments</span>}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header className="bg-white shadow-md p-4 rounded-lg flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Admin</span>
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        <section className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Articles</h2>
            <p className="mt-2 text-gray-600">Manage your articles here.</p>
            <Link
              to="/articles"
              className="text-blue-600 hover:underline mt-4 block"
            >
              Go to Articles →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
            <p className="mt-2 text-gray-600">
              Organize your articles into categories.
            </p>
            <Link
              to="/categories"
              className="text-blue-600 hover:underline mt-4 block"
            >
              Go to Categories →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800">Comments</h2>
            <p className="mt-2 text-gray-600">Manage article comments here.</p>
            <Link
              to="/comments"
              className="text-blue-600 hover:underline mt-4 block"
            >
              Go to Comments →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
