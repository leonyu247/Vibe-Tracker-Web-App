export interface WeekendProject {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  notes: string;
  timeSpent: number; // hours (manual entry)
  extraInfo: string;
}

const FIXED_ACTIVITIES: { title: string; description: string }[] = [
  { title: "Resolution Tracker", description: "Built, live, and logged" },
  { title: "Model Topography", description: "Topography Sheet + Rules of Thumb" },
  { title: "Deep Research Brief", description: "2 pages, clear recommendation" },
  { title: "Data Analysis Memo", description: "Cleaned data, 3 insights, 3 actions" },
  { title: "Visual Explainer", description: "One infographic you'd actually use" },
  { title: "Information Pipeline", description: "Summary + FAQ + Deck from source" },
  { title: "First Automation", description: "Content workflow working" },
  { title: "Second Automation", description: "Productivity workflow working" },
  { title: "Personal Context OS", description: "Context Docs + Capture system" },
  { title: "AI-Powered Build", description: "Chatbot/Agent deployed" },
];

export function createDefaultWeekends(): WeekendProject[] {
  return FIXED_ACTIVITIES.map((activity, i) => ({
    id: i + 1,
    title: activity.title,
    description: activity.description,
    completed: false,
    notes: "",
    timeSpent: 0,
    extraInfo: "",
  }));
}
