"use client";

export type SupabasePublicConfig = {
  url: string;
  publishableKey: string;
};

export type PlanningSession = {
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
  user: {
    id: string;
    email?: string;
  };
};

export type PlanCounts = Record<string, number>;

const SESSION_KEY = "localcheck.web.session";

function endpoint(config: SupabasePublicConfig, path: string) {
  return `${config.url.replace(/\/$/, "")}${path}`;
}

function headers(config: SupabasePublicConfig, accessToken?: string) {
  return {
    apikey: config.publishableKey,
    Authorization: `Bearer ${accessToken ?? config.publishableKey}`,
    "Content-Type": "application/json",
  };
}

async function readError(response: Response) {
  try {
    const body = await response.json() as { msg?: string; message?: string; error_description?: string };
    return body.error_description ?? body.message ?? body.msg ?? "Something went wrong.";
  } catch {
    return "Something went wrong.";
  }
}

async function assertOk(response: Response) {
  if (!response.ok) throw new Error(await readError(response));
}

export function planningIsConfigured(config: SupabasePublicConfig) {
  return Boolean(config.url && config.publishableKey);
}

export function readPlanningSession(): PlanningSession | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(SESSION_KEY);
    if (!value) return null;
    const session = JSON.parse(value) as PlanningSession;
    if (!session.access_token || !session.user?.id) return null;
    if (session.expires_at && session.expires_at * 1000 < Date.now()) {
      window.localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function savePlanningSession(session: PlanningSession) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearPlanningSession() {
  window.localStorage.removeItem(SESSION_KEY);
}

export async function signIn(
  config: SupabasePublicConfig,
  email: string,
  password: string,
): Promise<PlanningSession> {
  const response = await fetch(endpoint(config, "/auth/v1/token?grant_type=password"), {
    method: "POST",
    headers: headers(config),
    body: JSON.stringify({ email, password }),
  });
  await assertOk(response);
  const session = await response.json() as PlanningSession;
  savePlanningSession(session);
  return session;
}

export async function signUp(
  config: SupabasePublicConfig,
  email: string,
  password: string,
): Promise<PlanningSession> {
  const response = await fetch(endpoint(config, "/auth/v1/signup"), {
    method: "POST",
    headers: headers(config),
    body: JSON.stringify({ email, password }),
  });
  await assertOk(response);
  const session = await response.json() as PlanningSession;
  if (!session.access_token) {
    throw new Error("Email confirmation is still enabled in Supabase. Disable Confirm email, then try again.");
  }
  savePlanningSession(session);
  return session;
}

export async function loadPlanCounts(
  config: SupabasePublicConfig,
  courtKey: string,
  startDate: string,
  endDate: string,
): Promise<PlanCounts> {
  if (!planningIsConfigured(config)) return {};
  const response = await fetch(endpoint(config, "/rest/v1/rpc/get_court_time_intent_counts"), {
    method: "POST",
    headers: headers(config),
    body: JSON.stringify({
      p_court_key: courtKey,
      p_start_date: startDate,
      p_end_date: endDate,
    }),
  });
  await assertOk(response);
  const rows = await response.json() as Array<{
    planned_for: string;
    time_slot: string;
    attendee_count: number | string;
  }>;
  return Object.fromEntries(rows.map((row) => [
    `${row.planned_for}|${row.time_slot.slice(0, 5)}`,
    Number(row.attendee_count),
  ]));
}

export async function loadMyPlans(
  config: SupabasePublicConfig,
  session: PlanningSession,
  courtKey: string,
  startDate: string,
  endDate: string,
): Promise<Set<string>> {
  const query = new URLSearchParams({
    select: "planned_for,time_slot",
    court_key: `eq.${courtKey}`,
    user_id: `eq.${session.user.id}`,
    and: `(planned_for.gte.${startDate},planned_for.lte.${endDate})`,
  });
  const response = await fetch(endpoint(config, `/rest/v1/court_time_intents?${query}`), {
    headers: headers(config, session.access_token),
  });
  await assertOk(response);
  const rows = await response.json() as Array<{ planned_for: string; time_slot: string }>;
  return new Set(rows.map((row) => `${row.planned_for}|${row.time_slot.slice(0, 5)}`));
}

export async function addPlan(
  config: SupabasePublicConfig,
  session: PlanningSession,
  courtKey: string,
  plannedFor: string,
  timeSlot: string,
) {
  const response = await fetch(endpoint(config, "/rest/v1/court_time_intents?on_conflict=court_key,user_id,planned_for,time_slot"), {
    method: "POST",
    headers: {
      ...headers(config, session.access_token),
      Prefer: "resolution=ignore-duplicates,return=minimal",
    },
    body: JSON.stringify({
      court_key: courtKey,
      user_id: session.user.id,
      planned_for: plannedFor,
      time_slot: timeSlot,
    }),
  });
  await assertOk(response);
}

export async function removePlan(
  config: SupabasePublicConfig,
  session: PlanningSession,
  courtKey: string,
  plannedFor: string,
  timeSlot: string,
) {
  const query = new URLSearchParams({
    court_key: `eq.${courtKey}`,
    user_id: `eq.${session.user.id}`,
    planned_for: `eq.${plannedFor}`,
    time_slot: `eq.${timeSlot}`,
  });
  const response = await fetch(endpoint(config, `/rest/v1/court_time_intents?${query}`), {
    method: "DELETE",
    headers: headers(config, session.access_token),
  });
  await assertOk(response);
}
