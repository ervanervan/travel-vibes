import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <div className="grid grid-cols-2 items-center">
        <nav className="flex items-center flex-wrap gap-6">
          <Link to={"/"}>Home</Link>
          <Link to={"/articles-list"}>See All Article</Link>
        </nav>
        <div className="flex justify-end"></div>
      </div>
    </header>
  );
}
