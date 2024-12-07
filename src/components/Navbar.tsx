import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header
      className={` ${
        isHomePage
          ? "absolute top-4 left-0 w-full z-30 bg-transparent"
          : "bg-white/90 py-4"
      }`}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-2 items-center p-4 md:p-6">
          <Link to={"/"}>
            <h1
              className={`font-pacifico text-2xl md:text-3xl ${
                isHomePage ? "text-white/90" : "text-gray-950"
              }`}
            >
              Travel Vibes
            </h1>
          </Link>
          <div className="flex justify-end">
            <nav
              className={`flex items-center flex-wrap gap-6 ${
                isHomePage ? "text-white/90" : "text-gray-950"
              }`}
            >
              <Link to={"/article-list"}>See All Article</Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
