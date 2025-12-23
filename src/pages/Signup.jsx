import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import AuthLayout from "../components/AuthLayout";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async e => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await api.post("/users/register", form);

      toast.success("Account created successfully");
      navigate("/login");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Signup failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create your account">
      <form onSubmit={submit} className="space-y-5">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm text-muted">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full rounded-lg border border-gray-700 bg-bg px-4 py-3 text-sm 
              focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm text-muted">Email Address</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-700 bg-bg px-4 py-3 text-sm 
              focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm text-muted">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full rounded-lg border border-gray-700 bg-bg px-4 py-3 text-sm 
              focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className="w-full rounded-lg bg-accent py-3 font-semibold text-white 
            transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-primary hover:underline"
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
