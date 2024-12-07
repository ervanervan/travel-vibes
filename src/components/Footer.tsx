import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="container mx-auto">
        <div className="flex items-center gap-2 md:justify-center p-4 flex-wrap md:p-6 md:divide-x md:divide-gray-950/50">
          <p className="md:px-4">
            &copy; 2024 <span className="font-pacifico">Travel Vibes</span>.
          </p>
          <p className="md:px-4">All rights reserved.</p>
          <p className="md:px-4">
            Website by{" "}
            <Link
              to={"https://ervankurniawan.vercel.app/"}
              className="hover:underline"
            >
              Ervan Kurniawan
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
