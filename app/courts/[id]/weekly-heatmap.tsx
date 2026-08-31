"use client";

import {
  CalendarDots,
  CaretLeft,
  CaretRight,
  Check,
  House,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { CourtDetail } from "./court-data";
import {
  addPlan,
  clearPlanningSession,
  loadMyPlans,
  loadPlanCounts,
  planningIsConfigured,
  readPlanningSession,
  removePlan,
  signIn,
  signUp,
  type PlanningSession,
  type PlanCounts,
  type SupabasePublicConfig,
} from "./supabase-planning";

type Day = {
  iso: string;
  short: string;
  date: number;
  isToday: boolean;
};

const TIMES = [
  { value: "16:00", label: "4 PM" },
  { value: "18:00", label: "6 PM" },
  { value: "20:00", label: "8 PM" },
  { value: "22:00", label: "10 PM" },
] as const;

function parseDate(iso: string) {
  return new Date(`${iso}T12:00:00.000Z`);
}

function toIso(date: Date) {
  return date.toISOString().slice(0, 10);
}

function buildWeek(todayIso: string, weekOffset: number): Day[] {
  const start = parseDate(todayIso);
  start.setUTCDate(start.getUTCDate() + weekOffset * 7);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + index);
    return {
      iso: toIso(date),
      short: date.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }).toUpperCase(),
      date: date.getUTCDate(),
      isToday: weekOffset === 0 && index === 0,
    };
  });
}

function formatWeek(days: Day[]) {
  const start = parseDate(days[0].iso);
  const end = parseDate(days[6].iso);
  const startMonth = start.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
  const endMonth = end.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
  return startMonth === endMonth
    ? `${startMonth} ${start.getUTCDate()}–${end.getUTCDate()}`
    : `${startMonth} ${start.getUTCDate()}–${endMonth} ${end.getUTCDate()}`;
}

function planKey(dayIso: string, time: string) {
  return `${dayIso}|${time}`;
}

function intensity(count: number) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

export default function WeeklyHeatmap({
  court,
  todayIso,
  isLocal,
  onMakeLocal,
  supabase,
}: {
  court: CourtDetail;
  todayIso: string;
  isLocal: boolean;
  onMakeLocal: () => void;
  supabase: SupabasePublicConfig;
}) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [counts, setCounts] = useState<PlanCounts>({});
  const [myPlans, setMyPlans] = useState<Set<string>>(() => new Set());
  const [session, setSession] = useState<PlanningSession | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("Tap a time to see who's going.");
  const [isSyncing, setIsSyncing] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [authMessage, setAuthMessage] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const days = useMemo(() => buildWeek(todayIso, weekOffset), [todayIso, weekOffset]);
  const configured = planningIsConfigured(supabase);

  useEffect(() => {
    const timeout = window.setTimeout(() => setSession(readPlanningSession()), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let active = true;
    if (!configured) return;

    const sync = async () => {
      setIsSyncing(true);
      try {
        const [nextCounts, nextPlans] = await Promise.all([
          loadPlanCounts(supabase, court.id, days[0].iso, days[6].iso),
          session
            ? loadMyPlans(supabase, session, court.id, days[0].iso, days[6].iso)
            : Promise.resolve(new Set<string>()),
        ]);
        if (!active) return;
        setCounts(nextCounts);
        setMyPlans(nextPlans);
      } catch {
        if (active) setAnnouncement("Shared planning is waiting for the Supabase migration.");
      } finally {
        if (active) setIsSyncing(false);
      }
    };

    void sync();
    return () => {
      active = false;
    };
  }, [configured, court.id, days, session, supabase]);

  const selected = (() => {
    if (!selectedKey) return null;
    for (let dayIndex = 0; dayIndex < days.length; dayIndex += 1) {
      for (let timeIndex = 0; timeIndex < TIMES.length; timeIndex += 1) {
        const key = planKey(days[dayIndex].iso, TIMES[timeIndex].value);
        if (key === selectedKey) return { dayIndex, timeIndex, key };
      }
    }
    return null;
  })();

  const selectedHasMe = selected ? myPlans.has(selected.key) : false;
  const selectedCount = selected ? counts[selected.key] ?? 0 : 0;

  const savePlan = async (dayIndex: number, timeIndex: number) => {
    const day = days[dayIndex];
    const time = TIMES[timeIndex];
    const key = planKey(day.iso, time.value);
    if (!configured) {
      setAnnouncement("Add the Supabase public key to enable shared planning.");
      return;
    }
    if (!session) {
      setShowAuth(true);
      setAnnouncement("Sign in to add your time.");
      return;
    }
    if (myPlans.has(key)) {
      setAnnouncement(`You're already going ${day.short} at ${time.label}.`);
      return;
    }

    setMyPlans((current) => new Set(current).add(key));
    setCounts((current) => ({ ...current, [key]: (current[key] ?? 0) + 1 }));
    setAnnouncement(`Adding ${day.short} at ${time.label}…`);
    try {
      await addPlan(supabase, session, court.id, day.iso, time.value);
      setAnnouncement(`You're in for ${day.short} at ${time.label}.`);
    } catch {
      setMyPlans((current) => {
        const next = new Set(current);
        next.delete(key);
        return next;
      });
      setCounts((current) => ({ ...current, [key]: Math.max(0, (current[key] ?? 1) - 1) }));
      setAnnouncement("That plan did not save. Please sign in again and retry.");
    }
  };

  const selectSlot = (dayIndex: number, timeIndex: number) => {
    const day = days[dayIndex];
    const time = TIMES[timeIndex];
    const key = planKey(day.iso, time.value);
    setSelectedKey(key);

    if (!isLocal) {
      setAnnouncement(`Viewing ${day.short} ${time.label}. Make this your local court to join.`);
      return;
    }
    void savePlan(dayIndex, timeIndex);
  };

  const removeSelectedPlan = async () => {
    if (!selected || !session) return;
    const day = days[selected.dayIndex];
    const time = TIMES[selected.timeIndex];
    setMyPlans((current) => {
      const next = new Set(current);
      next.delete(selected.key);
      return next;
    });
    setCounts((current) => ({ ...current, [selected.key]: Math.max(0, (current[selected.key] ?? 1) - 1) }));
    try {
      await removePlan(supabase, session, court.id, day.iso, time.value);
      setAnnouncement("Removed that time from your plans.");
    } catch {
      setMyPlans((current) => new Set(current).add(selected.key));
      setCounts((current) => ({ ...current, [selected.key]: (current[selected.key] ?? 0) + 1 }));
      setAnnouncement("That change did not save. Please try again.");
    }
  };

  const makeLocal = () => {
    onMakeLocal();
    setAnnouncement("This is now your local court. Tap “I’m going” to join the slot.");
  };

  const moveWeek = (direction: -1 | 1) => {
    const next = Math.min(3, Math.max(0, weekOffset + direction));
    setWeekOffset(next);
    setSelectedKey(null);
    setAnnouncement(next === 0 ? "Showing this week." : `Showing ${next} week${next === 1 ? "" : "s"} ahead.`);
  };

  const submitAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const email = String(values.get("email") ?? "").trim();
    const password = String(values.get("password") ?? "");
    setAuthBusy(true);
    setAuthMessage("");
    try {
      const nextSession = authMode === "sign-up"
        ? await signUp(supabase, email, password)
        : await signIn(supabase, email, password);
      setSession(nextSession);
      setShowAuth(false);
      setAnnouncement(`Signed in as ${nextSession.user.email ?? email}. Select a time to join.`);
    } catch (error) {
      setAuthMessage(error instanceof Error ? error.message : "Could not sign in.");
    } finally {
      setAuthBusy(false);
    }
  };

  const signOut = () => {
    clearPlanningSession();
    setSession(null);
    setMyPlans(new Set());
    setAnnouncement("Signed out. Shared attendance is still visible.");
  };

  return (
    <>
      <section className="court-panel court-heatmap" id="weekly-pulse" aria-label={`Weekly plans for ${court.name}`}>
        <header className="court-heatmap__header">
          <div>
            <span className="court-panel__eyebrow"><CalendarDots size={15} weight="fill" /> Locals planning</span>
            <h2>Who&apos;s going this week</h2>
            <p>Every plan adds to the shared heatmap. Hotter orange means more locals picked that time.</p>
          </div>
          <div className="court-heatmap__header-tools">
            <div className="court-heatmap__account">
              {session ? (
                <><span>{session.user.email ?? "Signed in"}</span><button type="button" onClick={signOut}>Sign out</button></>
              ) : (
                <button type="button" onClick={() => setShowAuth(true)}>Sign in to plan</button>
              )}
            </div>
            <div className="court-heatmap__week-nav" aria-label="Choose week">
              <strong>{formatWeek(days)}</strong>
              <button type="button" onClick={() => moveWeek(-1)} disabled={weekOffset === 0} aria-label="Previous week"><CaretLeft size={16} weight="bold" /></button>
              <button type="button" onClick={() => moveWeek(1)} disabled={weekOffset === 3} aria-label="Next week"><CaretRight size={16} weight="bold" /></button>
            </div>
          </div>
        </header>

        <div className="court-heatmap__body">
          <div className="court-heatmap__grid" role="grid" aria-label={`Going heatmap for ${formatWeek(days)}`}>
            <span className="court-heatmap__corner" aria-hidden="true" />
            {days.map((day) => (
              <span className={`court-heatmap__day${day.isToday ? " is-today" : ""}`} role="columnheader" key={day.iso}>
                <small>{day.isToday ? "TODAY" : day.short}</small>
                <strong>{day.date}</strong>
              </span>
            ))}

            {TIMES.map((time, timeIndex) => (
              <div className="court-heatmap__row" role="row" key={time.value}>
                <span className="court-heatmap__time" role="rowheader">{time.label}</span>
                {days.map((day, dayIndex) => {
                  const key = planKey(day.iso, time.value);
                  const count = counts[key] ?? 0;
                  const hasMe = myPlans.has(key);
                  const isSelected = selectedKey === key;
                  return (
                    <button
                      className={`court-heatmap__cell level-${intensity(count)}${isSelected ? " is-selected" : ""}${hasMe ? " has-me" : ""}`}
                      type="button"
                      role="gridcell"
                      aria-label={`${day.short} ${day.date} at ${time.label}: ${count} going${hasMe ? ", including you" : ""}`}
                      aria-selected={hasMe}
                      onClick={() => selectSlot(dayIndex, timeIndex)}
                      key={key}
                    >
                      <span>{count || ""}</span>
                      {hasMe ? <Check size={13} weight="bold" aria-hidden="true" /> : null}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="court-heatmap__legend" aria-label="Heatmap legend">
            <span>Quiet</span><i className="level-0" /><i className="level-1" /><i className="level-2" /><i className="level-3" /><i className="level-4" /><span>Busy</span>
            <em><i /> Your plans</em>
          </div>
        </div>

        <div className={`court-heatmap__detail${selected ? " has-selection" : ""}`} aria-live="polite">
          {selected ? (
            <>
              <div className="court-heatmap__selection-meta">
                <span>{days[selected.dayIndex].short} {days[selected.dayIndex].date} · {TIMES[selected.timeIndex].label}</span>
                <strong>{selectedCount} going</strong>
              </div>
              <div className="court-heatmap__people">
                {selectedHasMe ? (
                  <span className="court-heatmap__person is-you"><i className="court-player__avatar">YOU</i><b>You</b><small>Planned</small></span>
                ) : null}
                {selectedCount - (selectedHasMe ? 1 : 0) > 0 ? (
                  <span className="court-heatmap__aggregate">
                    <UsersThree size={19} weight="fill" />
                    <b>{selectedCount - (selectedHasMe ? 1 : 0)} other {selectedCount - (selectedHasMe ? 1 : 0) === 1 ? "local" : "locals"}</b>
                    <small>Privacy-safe aggregate</small>
                  </span>
                ) : null}
                {!selectedCount ? (
                  <span className="court-heatmap__nobody"><UsersThree size={19} weight="fill" /> Be the first local to set a time.</span>
                ) : null}
              </div>
              <div className="court-heatmap__selection-action">
                {selectedHasMe ? (
                  <button type="button" onClick={() => void removeSelectedPlan()}><X size={15} weight="bold" /> Remove my time</button>
                ) : !isLocal ? (
                  <button type="button" onClick={makeLocal}><House size={15} weight="fill" /> Make this my local court</button>
                ) : session ? (
                  <button type="button" onClick={() => void savePlan(selected.dayIndex, selected.timeIndex)}><Check size={15} weight="bold" /> I&apos;m going</button>
                ) : (
                  <button type="button" onClick={() => setShowAuth(true)}>Sign in to plan</button>
                )}
              </div>
            </>
          ) : (
            <div className="court-heatmap__prompt"><UsersThree size={20} weight="fill" /><span><strong>Pick a time</strong><small>See the shared crowd signal and add your plan.</small></span></div>
          )}
        </div>
        <p className="court-heatmap__announcement" role="status">{isSyncing ? "Refreshing shared plans…" : announcement}</p>
      </section>

      {showAuth ? (
        <div className="planner-auth" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setShowAuth(false)}>
          <section className="planner-auth__panel" role="dialog" aria-modal="true" aria-labelledby="planner-auth-title">
            <button className="planner-auth__close" type="button" onClick={() => setShowAuth(false)} aria-label="Close sign in"><X size={18} /></button>
            <span className="court-panel__eyebrow"><i /> Shared planning</span>
            <h2 id="planner-auth-title">{authMode === "sign-up" ? "Create account" : "Welcome back"}</h2>
            <p>{authMode === "sign-up" ? "One account keeps your weekly plans in sync." : "Sign in to add or remove your court times."}</p>
            <form onSubmit={submitAuth}>
              <label>Email<input name="email" type="email" autoComplete="email" required /></label>
              <label>Password<input name="password" type="password" autoComplete={authMode === "sign-up" ? "new-password" : "current-password"} minLength={6} required /></label>
              {authMessage ? <span className="planner-auth__error" role="alert">{authMessage}</span> : null}
              <button type="submit" disabled={authBusy}>{authBusy ? "Working…" : authMode === "sign-up" ? "Create account" : "Sign in"}</button>
            </form>
            <button className="planner-auth__switch" type="button" onClick={() => { setAuthMode((mode) => mode === "sign-in" ? "sign-up" : "sign-in"); setAuthMessage(""); }}>
              {authMode === "sign-in" ? "New here? Create an account" : "Already have an account? Sign in"}
            </button>
          </section>
        </div>
      ) : null}
    </>
  );
}
