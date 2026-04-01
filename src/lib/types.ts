export interface WeekendProject {
  id: number;
  title: string;
  completed: boolean;
  notes: string;
  timeSpent: number; // hours (manual entry)
}

export function createDefaultWeekends(): WeekendProject[] {
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Weekend ${i + 1} Project`,
    completed: false,
    notes: "",
    timeSpent: 0,
  }));
}
