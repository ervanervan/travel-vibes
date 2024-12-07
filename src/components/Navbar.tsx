import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 items-center p-6">
          <Link to={"/"}>
            <h1 className="font-pacifico text-3xl">Travel Vibes</h1>
          </Link>
          <div className="flex justify-end">
            <nav className="flex items-center flex-wrap gap-6">
              <Link to={"/article-list"}>See All Article</Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
