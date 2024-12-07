import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <main className="relative">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </>
  );
}
