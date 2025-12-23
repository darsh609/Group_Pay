import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import AuthLayout from "../components/AuthLayout";
// import jwtDecode from "jwt-decode";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/users/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.id);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login successful");

      // IMPORTANT: delay navigation so toast is visible
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Login to your account">
      <form onSubmit={submit} className="space-y-5">
        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm text-muted">Email</label>
          <input
            type="email"
            className="w-full rounded-lg bg-bg border border-gray-700 px-4 py-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm text-muted">Password</label>
          <input
            type="password"
            className="w-full rounded-lg bg-bg border border-gray-700 px-4 py-3 text-sm
              focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className="w-full bg-primary rounded-lg py-3 font-semibold text-white
            transition hover:bg-purple-600 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-sm text-muted mt-6">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-accent font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
