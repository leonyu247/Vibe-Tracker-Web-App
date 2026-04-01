"use client";

export default function ProgressBar({
  percent,
  completedCount,
  totalTime,
}: {
  percent: number;
  completedCount: number;
  totalTime: number;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Overall Progress</h2>
        <div className="flex gap-4 text-sm text-gray-500">
          <span>
            <strong className="text-gray-800">{completedCount}</strong>/10 weekends
          </span>
          <span>
            <strong className="text-gray-800">{totalTime.toFixed(1)}</strong>h total
          </span>
        </div>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-700 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-right text-sm text-gray-500 mt-1">
        {Math.round(percent)}% complete
      </p>
    </div>
  );
}
