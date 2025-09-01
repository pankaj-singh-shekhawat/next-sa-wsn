"use client";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  async function handleLogout() {
    try {
      // Call API to clear cookie
      await fetch("/api/auth/logout", { method: "GET" });

      // Clear client-side state
      logout();

      // Redirect to login page
      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
    >
      Logout
    </button>
  );
}