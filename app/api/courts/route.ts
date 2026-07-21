import { loadExplorerCourts } from "../../courts/supabase-courts";

export async function GET() {
  const result = await loadExplorerCourts();

  return Response.json(result, {
    headers: {
      "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
    },
  });
}
