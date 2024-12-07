import { useState } from "react";
import { getUserData, registerUser } from "../services/authService";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await registerUser(email, username, password);
      console.log("Registered user data:", data);

      // Ambil token dari response
      const token = data.jwt;

      // Fetch data pengguna menggunakan token
      const userData = await getUserData(token);
      console.log("Fetched user data:", userData);

      alert(`Welcome ${userData.username}! Your email is ${userData.email}`);
    } catch (err) {
      setError("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-pacifico mb-2 text-center">
          Travel Vibes
        </h1>
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-nonefocus:ring-gray-950/10 focus:border-gray-950/10"
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-nonefocus:ring-gray-950/10 focus:border-gray-950/10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 mb-6 border rounded-lg focus:outline-nonefocus:ring-gray-950/10 focus:border-gray-950/10"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white/90 transition-all duration-300 ease-in-out ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-950 hover:bg-gray-950/90"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="flex items-center justify-center text-gray-900 gap-1 mt-5">
          Sudah punya akun?{" "}
          <span className="font-semibold">
            <Link to="/login"> Login</Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
