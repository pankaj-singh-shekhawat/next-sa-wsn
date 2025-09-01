"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setProfile = useAuthStore((state) => state.setProfile);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ allows cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // If using token storage (optional, less secure)
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        setProfile(data.profile);
      }

      // Redirect after login
      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-6 text-center text-4xl font-bold tracking-tight">
          Sheetal and Associates
        </h2>
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight">
          Login
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
                placeholder="Enter email"
                className="block w-full rounded-md px-3 py-1.5 text-base placeholder:text-gray-500 sm:text-sm border border-indigo-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
                placeholder="Enter password"
                className="block w-full rounded-md px-3 py-1.5 text-base placeholder:text-gray-500 sm:text-sm border border-indigo-500"
              />
            </div>
            <div className="mt-2">
              <Link href="/register" className="hover:text-indigo-600">
                New user? Register here
              </Link>
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading || !email || !password}
            className="block w-full rounded-md px-3 py-1.5 bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}