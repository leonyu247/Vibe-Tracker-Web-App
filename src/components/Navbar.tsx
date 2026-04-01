"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-2xl">🎯</span>
          <span>Vibe Tracker</span>
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-violet-200 hidden sm:inline">
                {user.email}
              </span>
              <button
                onClick={signOut}
                className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/login"
                className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-white hover:bg-violet-50 text-violet-700 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
