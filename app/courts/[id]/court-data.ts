export type CourtDetail = {
  id: string;
  name: string;
  sport: "Basketball" | "Pickleball";
  address: string;
  neighborhood: string;
  distance: string;
  coordinates: [number, number];
  liveCount: number | null;
  localCount: number | null;
  liveNote: string;
  details: Array<{ label: string; value: string }>;
};
