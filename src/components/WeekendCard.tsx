"use client";

import { WeekendProject } from "@/lib/types";
import { useState } from "react";

export default function WeekendCard({
  weekend,
  onUpdate,
  isSuggested,
}: {
  weekend: WeekendProject;
  onUpdate: (id: number, changes: Partial<WeekendProject>) => void;
  isSuggested: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(weekend.title);
  const [description, setDescription] = useState(weekend.description ?? "");
  const [notes, setNotes] = useState(weekend.notes);
  const [timeSpent, setTimeSpent] = useState(weekend.timeSpent.toString());
  const [extraInfo, setExtraInfo] = useState(weekend.extraInfo ?? "");

  const handleSave = () => {
    const parsedTime = parseFloat(timeSpent);
    onUpdate(weekend.id, {
      title,
      description,
      notes,
      timeSpent: isNaN(parsedTime) || parsedTime < 0 ? 0 : parsedTime,
      extraInfo,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(weekend.title);
    setDescription(weekend.description ?? "");
    setNotes(weekend.notes);
    setTimeSpent(weekend.timeSpent.toString());
    setExtraInfo(weekend.extraInfo ?? "");
    setIsEditing(false);
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-300 ${
        weekend.completed
          ? "border-green-200 bg-green-50/30"
          : isSuggested
          ? "border-amber-300 ring-2 ring-amber-100"
          : "border-gray-100 hover:border-violet-200"
      }`}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <div className="pt-0.5">
            <input
              type="checkbox"
              checked={weekend.completed}
              onChange={(e) =>
                onUpdate(weekend.id, { completed: e.target.checked })
              }
              className="w-5 h-5 rounded border-gray-300 text-violet-600 focus:ring-violet-500 cursor-pointer"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-violet-500 bg-violet-50 px-2 py-0.5 rounded-full">
                W{weekend.id}
              </span>
              {isSuggested && !weekend.completed && (
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  ✨ Suggested
                </span>
              )}
              {weekend.completed && (
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  ✅ Done
                </span>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-3 mt-2">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Activity Name</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300"
                    placeholder="Activity name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300"
                    placeholder="Short description / deliverable"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 resize-none"
                    placeholder="Notes about this weekend project..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Extra Info</label>
                  <textarea
                    value={extraInfo}
                    onChange={(e) => setExtraInfo(e.target.value)}
                    rows={2}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300 resize-none"
                    placeholder="Links, resources, additional context..."
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-500">Time spent:</label>
                  <input
                    type="number"
                    value={timeSpent}
                    onChange={(e) => setTimeSpent(e.target.value)}
                    min="0"
                    step="0.5"
                    className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300"
                  />
                  <span className="text-sm text-gray-500">hours</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3
                  className={`font-semibold text-gray-800 ${
                    weekend.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {weekend.title}
                </h3>
                {weekend.description && (
                  <p className="text-sm text-indigo-500 mt-0.5">{weekend.description}</p>
                )}
                {weekend.notes && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{weekend.notes}</p>
                )}
                {weekend.extraInfo && (
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2 italic">{weekend.extraInfo}</p>
                )}
                <div className="flex items-center gap-4 mt-2">
                  {weekend.timeSpent > 0 && (
                    <span className="text-xs text-gray-400">
                      ⏱️ {weekend.timeSpent}h logged
                    </span>
                  )}
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-xs text-violet-500 hover:text-violet-700 font-medium transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
