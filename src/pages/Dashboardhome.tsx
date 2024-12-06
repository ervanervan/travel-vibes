import { ArrowRightCircle } from "iconoir-react";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  return (
    <section className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-950">Articles</h2>
        <p className="mt-2 text-gray-950/80">Manage your articles here.</p>
        <Link
          to="articles"
          className="flex items-center gap-2 text-gray-950/60 hover:underline mt-4 block"
        >
          See Articles <ArrowRightCircle />
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-950">Categories</h2>
        <p className="mt-2 text-gray-950/80">
          Organize your articles into categories.
        </p>
        <Link
          to="categories"
          className="flex items-center gap-2 text-gray-950/60 hover:underline mt-4 block"
        >
          See Categories <ArrowRightCircle />
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-950">Comments</h2>
        <p className="mt-2 text-gray-950/80">Manage article comments here.</p>
        <Link
          to="comments"
          className="flex items-center gap-2 text-gray-950/60 hover:underline mt-4 block"
        >
          See Comments <ArrowRightCircle />
        </Link>
      </div>
    </section>
  );
};

export default DashboardHome;
