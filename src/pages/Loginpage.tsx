import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useState } from "react";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(identifier, password);

      // Simpan token dan user di localStorage
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect ke halaman lain setelah login sukses
      navigate("/dashboard");
    } catch (err: any) {
      setError(err || "Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-pacifico mb-2 text-center">
          Travel Vibes
        </h1>
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-gray-700"
            >
              Email/Username
            </label>
            <input
              type="text"
              id="identifier"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-950/10 focus:border-gray-950/10 sm:text-sm"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div className="mb-10">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-950/10 focus:border-gray-950/10 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white/90 transition-all duration-300 ease-in-out ${
              loading ? "bg-gray-400" : "bg-gray-950 hover:bg-gray-950/90"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center justify-center text-gray-900 gap-1 mt-5">
          Belum punya akun?{" "}
          <span className="font-semibold">
            <Link to="/register"> Register</Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
