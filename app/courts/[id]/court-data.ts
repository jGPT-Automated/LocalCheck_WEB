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
  liveNote: string;
  details: Array<{ label: string; value: string }>;
};
