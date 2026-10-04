export const APP_FAQS = [
  {
    question: "Is the heatmap live occupancy?",
    answer: "No. The weekly heatmap shows when players plan to go. Live check-ins are a separate current-court signal, and scheduled games are marked as organized events.",
  },
  {
    question: "Does a submitted score change Elo immediately?",
    answer: "No. A score enters review first. A finalized result updates the competitive record and Elo; a dispute pauses settlement.",
  },
  {
    question: "Can anyone add a court?",
    answer: "Players can submit a missing court from the app, but the flow checks location, possible duplicates, and a live on-site photo before the court is published.",
  },
  {
    question: "Which sports are shown?",
    answer: "LocalCheck currently presents basketball and pickleball court discovery, schedules, games, and leaderboards within their own local context.",
  },
] as const;
