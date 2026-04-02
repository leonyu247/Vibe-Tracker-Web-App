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
  { title: "The Vibe Code Kickoff", description: "Build Your Resolution Tracker" },
  { title: "The Model Mapping Project", description: "Build Your Personal AI Topography" },
  { title: "The Deep Research Brief", description: "Let AI Do a Week's Research in an Afternoon" },
  { title: "The Analysis Project", description: "Turn Messy Data into Actual Decisions" },
  { title: "The Visual Reasoning Project", description: "Make AI See and Think" },
  { title: "Information Pipeline", description: "Build Your NotebookLM + Gamma Stack" },
  { title: "First Automation", description: "Build Your Content Distribution Machine" },
  { title: "Second Automation", description: "Build Your Productivity Workflow" },
  { title: "The Context Engineering Project", description: "Build Your Personal AI Operating System" },
  { title: "AI-Powered Build", description: "Build Something with AI Inside It" },
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
