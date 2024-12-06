import { Link } from "react-router-dom";

const DashboardHome = () => {
  return (
    <section className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800">Articles</h2>
        <p className="mt-2 text-gray-600">Manage your articles here.</p>
        <Link
          to="articles"
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
          to="categories"
          className="text-blue-600 hover:underline mt-4 block"
        >
          Go to Categories →
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800">Comments</h2>
        <p className="mt-2 text-gray-600">Manage article comments here.</p>
        <Link
          to="comments"
          className="text-blue-600 hover:underline mt-4 block"
        >
          Go to Comments →
        </Link>
      </div>
    </section>
  );
};

export default DashboardHome;
