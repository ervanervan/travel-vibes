import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <nav className="flex items-center flex-wrap gap-6">
        <Link to={"/"}>Home</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
        <Link to={"/dashboard"}>Dashboard</Link>
        <Link to={"/profile"}>Profile</Link>
        <Link to={"/article"}>Article</Link>
      </nav>
    </header>
  );
}
