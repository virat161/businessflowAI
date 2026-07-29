import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>
          <p className="text-slate-400 mt-2">
            Sign in to continue to BusinessFlow AI
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-400">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#" className="text-blue-400 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Temporary Login Button */}
          <Link to="/dashboard" className="block">
            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 font-semibold text-white"
            >
              Login
            </button>
          </Link>

        </form>

        <p className="text-center text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}