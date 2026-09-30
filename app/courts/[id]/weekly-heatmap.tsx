"use client";

import { CalendarDots, UsersThree } from "@phosphor-icons/react";
import { useMemo } from "react";
import type { CourtDetail } from "./court-data";

type Day = {
  iso: string;
  short: string;
  date: number;
  isToday: boolean;
};

const TIMES = Array.from({ length: 15 }, (_, index) => {
  const hour = index + 8;
  const twelveHour = hour % 12 || 12;
  return {
    value: hour,
    label: `${twelveHour} ${hour < 12 ? "AM" : "PM"}`,
  };
});

function parseDate(iso: string) {
  return new Date(`${iso}T12:00:00.000Z`);
}

function toIso(date: Date) {
  return date.toISOString().slice(0, 10);
}

function toLocalIso(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildWeek(todayIso: string): Day[] {
  const start = parseDate(todayIso);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + index);
    return {
      iso: toIso(date),
      short: date.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }).toUpperCase(),
      date: date.getUTCDate(),
      isToday: index === 0,
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

function planKey(dayIso: string, hour: number) {
  return `${dayIso}|${hour}`;
}

function intensity(count: number) {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count <= 4) return 2;
  if (count <= 7) return 3;
  return 4;
}

export default function WeeklyHeatmap({
  court,
  todayIso,
  plannedAt,
  dataAvailable,
}: {
  court: CourtDetail;
  todayIso: string;
  plannedAt: string[];
  dataAvailable: boolean;
}) {
  const days = useMemo(() => buildWeek(todayIso), [todayIso]);
  const counts = useMemo(() => {
    const next = new Map<string, number>();
    for (const timestamp of plannedAt) {
      const date = new Date(timestamp);
      if (Number.isNaN(date.getTime())) continue;
      const key = planKey(toLocalIso(date), date.getHours());
      next.set(key, (next.get(key) ?? 0) + 1);
    }
    return next;
  }, [plannedAt]);

  return (
    <section className="court-panel court-heatmap" id="weekly-pulse" aria-label={`Weekly plans for ${court.name}`}>
      <header className="court-heatmap__header">
        <div>
          <span className="court-panel__eyebrow"><CalendarDots size={15} weight="fill" /> App schedule · View only</span>
          <h2>Who&apos;s going this week</h2>
          <p>Live planned-time totals from LocalCheck. Open the LocalCheck app to add or change plans.</p>
        </div>
        <div className="court-heatmap__week-nav" aria-label="Current week">
          <strong>{formatWeek(days)}</strong>
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

          {TIMES.map((time) => (
            <div className="court-heatmap__row" role="row" key={time.value}>
              <span className="court-heatmap__time" role="rowheader">{time.label}</span>
              {days.map((day) => {
                const key = planKey(day.iso, time.value);
                const count = counts.get(key) ?? 0;
                return (
                  <span
                    className={`court-heatmap__cell level-${intensity(count)}`}
                    role="gridcell"
                    aria-label={`${day.short} ${day.date} at ${time.label}: ${count} going`}
                    key={key}
                  >
                    <span>{count || ""}</span>
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        <div className="court-heatmap__legend" aria-label="Heatmap legend">
          <span>Quiet</span><i className="level-0" /><i className="level-1" /><i className="level-2" /><i className="level-3" /><i className="level-4" /><span>Busy</span>
          <em>Local time</em>
        </div>
      </div>

      <div className="court-heatmap__detail">
        <div className="court-heatmap__prompt">
          <UsersThree size={20} weight="fill" />
          <span>
            <strong>{dataAvailable ? `${plannedAt.length} planned time${plannedAt.length === 1 ? "" : "s"} this week` : "Schedule data unavailable"}</strong>
            <small>{dataAvailable ? "Totals are anonymous and refresh from the app backend." : "The website did not substitute demo activity."}</small>
          </span>
        </div>
      </div>
    </section>
  );
}
