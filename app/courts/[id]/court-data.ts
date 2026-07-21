export type CourtDetail = {
  id: string;
  name: string;
  sport: "Basketball" | "Pickleball";
  address: string;
  neighborhood: string;
  distance: string;
  coordinates: [number, number];
  liveCount: number;
  localCount: number;
  isLocal: boolean;
  liveNote: string;
  peakWindow: string;
  details: Array<{ label: string; value: string }>;
  players: Array<{ initials: string; name: string; detail: string; tier: "gold" | "silver" | "slate" }>;
  schedule: Array<{ day: string; time: string; title: string; attendance: string; type: string }>;
  activity: number[];
};
