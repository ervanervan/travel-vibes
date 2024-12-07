import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <main className="relative bg-gray-100">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </>
  );
}
