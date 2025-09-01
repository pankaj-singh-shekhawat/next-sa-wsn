"use client"
import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [name, setName]         = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail]       = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ if backend sets cookie
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      alert(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      resetRegisterForm();
    }
  }

  function resetRegisterForm(){
    setName("");
    setPassword("");
    setEmail("");
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-6 text-center text-4xl font-bold tracking-tight">
          Sheetal and Associates
        </h2>
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight">
          Register
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="off"
                placeholder="Enter name"
                className="block w-full rounded-md px-3 py-1.5 text-base placeholder:text-gray-500 sm:text-sm border border-indigo-500"
              />
            </div>
          </div>

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
            <div>
              <Link href="/login" className="hover:text-indigo-600">Existing user ? login here</Link>
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="block w-full rounded-md px-3 py-1.5 bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50"
          >
            {loading ? "registering..." : "Submit"}
          </button>

        </form>
      </div>
    </div>
  );
}