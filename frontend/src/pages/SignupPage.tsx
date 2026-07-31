import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { signup, saveAuth } from "../services/authServices";
export default function SignupPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

try {
  const result = await signup({
    full_name: fullName,
    email,
    password,
  });

  saveAuth(result);

  navigate("/dashboard");

} catch (err: any) {
  setError(err.message || "Signup failed");
} finally {
  setLoading(false);
}
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-8 shadow-2xl">

        <div className="text-center">

          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-2 text-slate-400">
            Join BusinessFlow AI
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
              Full Name
            </label>

            <div className="mt-2 relative">

              <User
                size={18}
                className="absolute left-3 top-3 text-slate-500"
              />

              <input
                type="text"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                placeholder="John Doe"
                className="w-full rounded-lg bg-slate-800 border border-slate-700 py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
              />

            </div>

          </div>

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
                    <div>

            <label className="text-sm text-slate-300">
              Confirm Password
            </label>

            <div className="mt-2 relative">

              <Lock
                size={18}
                className="absolute left-3 top-3 text-slate-500"
              />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="••••••••"
                className="w-full rounded-lg bg-slate-800 border border-slate-700 py-3 pl-10 pr-12 text-white outline-none focus:border-indigo-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-3 top-3 text-slate-500"
              >
                {showConfirmPassword ? (
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
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-slate-400">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Sign In
          </Link>

        </div>

      </div>

    </div>
  );
}