"use client";

import { WeekendProject } from "@/lib/types";
import { useState } from "react";

export default function SuggestNext({
  suggestNext,
}: {
  suggestNext: () => WeekendProject | null;
}) {
  const [suggestion, setSuggestion] = useState<WeekendProject | null>(null);
  const [show, setShow] = useState(false);

  const handleSuggest = () => {
    const next = suggestNext();
    setSuggestion(next);
    setShow(true);
    setTimeout(() => setShow(false), 5000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <button
        onClick={handleSuggest}
        className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all hover:shadow-md active:scale-95"
      >
        ✨ Suggest Next Weekend
      </button>
      {show && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-lg text-sm animate-fade-in">
          {suggestion ? (
            <>
              👉 Work on <strong>{suggestion.title}</strong> (Weekend{" "}
              {suggestion.id})
              {suggestion.timeSpent > 0 && (
                <span className="text-amber-600">
                  {" "}— you&apos;ve already put in {suggestion.timeSpent}h!
                </span>
              )}
            </>
          ) : (
            <>🎉 All weekends are complete! Amazing work!</>
          )}
        </div>
      )}
    </div>
  );
}
