import { loadExplorerCourts } from "../../courts/supabase-courts";

export async function GET() {
  const result = await loadExplorerCourts();

  return Response.json(result, {
    status: result.source === "unavailable" ? 503 : 200,
    headers: {
      "Cache-Control": result.source === "unavailable" ? "no-store" : "public, max-age=60, stale-while-revalidate=300",
    },
  });
}
