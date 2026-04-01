"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useWeekends } from "@/hooks/useWeekends";
import ProgressBar from "@/components/ProgressBar";
import SuggestNext from "@/components/SuggestNext";
import WeekendList from "@/components/WeekendList";
import Link from "next/link";

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const {
    weekends,
    loading: dataLoading,
    updateWeekend,
    completedCount,
    totalTime,
    progressPercent,
    suggestNext,
  } = useWeekends();

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-400 text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="text-center max-w-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎯 Vibe Tracker
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            Track 10 weekends of coding projects. Set goals, log time, take
            notes, and watch your progress grow.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/login"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-md hover:shadow-lg"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-white hover:bg-gray-50 text-violet-700 border-2 border-violet-200 px-6 py-3 rounded-xl font-medium transition-all"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const suggested = suggestNext();
  const suggestedId = suggested?.id ?? null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Weekends</h1>
          <p className="text-sm text-gray-500">
            Track your 10-weekend vibe coding journey
          </p>
        </div>
        <SuggestNext suggestNext={suggestNext} />
      </div>

      <ProgressBar
        percent={progressPercent}
        completedCount={completedCount}
        totalTime={totalTime}
      />

      {dataLoading ? (
        <div className="text-center text-gray-400 py-8">
          Loading your weekends...
        </div>
      ) : (
        <WeekendList
          weekends={weekends}
          onUpdate={updateWeekend}
          suggestedId={suggestedId}
        />
      )}
    </div>
  );
}
