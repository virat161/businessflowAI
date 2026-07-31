import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { login, saveAuth } from "@/services/authServices";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const result = await login({
        email,
        password,
      });

      saveAuth(result);

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-8 shadow-2xl">

        <div className="text-center">

          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-slate-400">
            Sign in to continue to BusinessFlow AI
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>

            <label className="text-sm text-slate-300">
              Email
            </label>

            <div className="mt-2 relative">

              <Mail
                size={18}
                className="absolute left-3 top-3 text-slate-500"
              />

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="john@example.com"
                className="w-full rounded-lg bg-slate-800 border border-slate-700 py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
              />

            </div>

          </div>

          <div>

            <label className="text-sm text-slate-300">
              Password
            </label>

            <div className="mt-2 relative">

              <Lock
                size={18}
                className="absolute left-3 top-3 text-slate-500"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                className="w-full rounded-lg bg-slate-800 border border-slate-700 py-3 pl-10 pr-12 text-white outline-none focus:border-indigo-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-3 text-slate-500"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 transition py-3 text-white font-semibold disabled:opacity-60"
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-slate-400">

          Don't have an account?{" "}

          <Link
            to="/signup"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Create Account
          </Link>

        </div>

      </div>

    </div>
  );
}