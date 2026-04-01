"use client";

import WeekendCard from "./WeekendCard";
import { WeekendProject } from "@/lib/types";

export default function WeekendList({
  weekends,
  onUpdate,
  suggestedId,
}: {
  weekends: WeekendProject[];
  onUpdate: (id: number, changes: Partial<WeekendProject>) => void;
  suggestedId: number | null;
}) {
  return (
    <div className="space-y-3">
      {weekends.map((weekend) => (
        <WeekendCard
          key={weekend.id}
          weekend={weekend}
          onUpdate={onUpdate}
          isSuggested={suggestedId === weekend.id}
        />
      ))}
    </div>
  );
}
