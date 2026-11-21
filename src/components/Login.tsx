import { useState, type FormEvent } from "react";
import Dashboard from "./Dashboard";

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (email === "task@gmail.com" && password === "task") {
      setIsLoggedIn(true);
      setEmail("");
      setPassword("");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  if (isLoggedIn) {
    return <Dashboard onLogout={() => setIsLoggedIn(false)} />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-5 text-xl font-semibold text-slate-900">
          Welcome back
        </h1>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-xs font-medium text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-xs font-semibold text-slate-900"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-xs font-semibold text-slate-900"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-[#00f060] py-2 text-sm font-semibold text-slate-900 transition hover:bg-[#00d955] focus:outline-none focus:ring-2 focus:ring-green-500/50"
          >
            Log In
          </button>
        </form>
        
      </div>
    </div>
  );
}
