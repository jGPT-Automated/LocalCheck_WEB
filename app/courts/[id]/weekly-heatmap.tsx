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
import { useMemo, useState } from "react";
import type { CourtDetail } from "./court-data";

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
  if (count <= 3) return 1;
  if (count <= 7) return 2;
  if (count <= 11) return 3;
  return 4;
}

export default function WeeklyHeatmap({
  court,
  todayIso,
  isLocal,
  onMakeLocal,
}: {
  court: CourtDetail;
  todayIso: string;
  isLocal: boolean;
  onMakeLocal: () => void;
}) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [myPlans, setMyPlans] = useState<Set<string>>(() => new Set());
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("Tap a time to see who's going.");
  const days = useMemo(() => buildWeek(todayIso, weekOffset), [todayIso, weekOffset]);

  // The launch database does not yet contain authenticated planned visits.
  // Keep aggregate cells empty instead of inventing attendance; a user's own
  // browser-local plan is the only value added in this public preview.
  const attendeesFor = () => [] as CourtDetail["players"];

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

  const selectedAttendees = selected ? attendeesFor() : [];
  const selectedHasMe = selected ? myPlans.has(selected.key) : false;
  const selectedCount = selectedAttendees.length + (selectedHasMe ? 1 : 0);

  const selectSlot = (dayIndex: number, timeIndex: number) => {
    const day = days[dayIndex];
    const time = TIMES[timeIndex];
    const key = planKey(day.iso, time.value);
    setSelectedKey(key);

    if (!isLocal) {
      setAnnouncement(`Viewing ${day.short} ${time.label}. Set this as your local court to add your time.`);
      return;
    }

    if (myPlans.has(key)) {
      setAnnouncement(`You're already going ${day.short} at ${time.label}.`);
      return;
    }

    setMyPlans((current) => new Set(current).add(key));
    setAnnouncement(`Added ${day.short} at ${time.label} to your plans.`);
  };

  const removeSelectedPlan = () => {
    if (!selected) return;
    setMyPlans((current) => {
      const next = new Set(current);
      next.delete(selected.key);
      return next;
    });
    setAnnouncement("Removed that time from your plans.");
  };

  const makeLocal = () => {
    onMakeLocal();
    setAnnouncement("This is now your local court. Add the selected time when you're ready.");
  };

  const moveWeek = (direction: -1 | 1) => {
    const next = Math.min(3, Math.max(0, weekOffset + direction));
    setWeekOffset(next);
    setSelectedKey(null);
    setAnnouncement(next === 0 ? "Showing this week." : `Showing ${next} week${next === 1 ? "" : "s"} ahead.`);
  };

  return (
    <section className="court-panel court-heatmap" id="weekly-pulse" aria-label={`Weekly plans for ${court.name}`}>
      <header className="court-heatmap__header">
        <div>
          <span className="court-panel__eyebrow"><CalendarDots size={15} weight="fill" /> Locals planning</span>
          <h2>Who&apos;s going this week</h2>
          <p>Tap a time to add your plan. Shared attendance appears after authenticated planning is connected.</p>
        </div>
        <div className="court-heatmap__week-nav" aria-label="Choose week">
          <strong>{formatWeek(days)}</strong>
          <button type="button" onClick={() => moveWeek(-1)} disabled={weekOffset === 0} aria-label="Previous week"><CaretLeft size={16} weight="bold" /></button>
          <button type="button" onClick={() => moveWeek(1)} disabled={weekOffset === 3} aria-label="Next week"><CaretRight size={16} weight="bold" /></button>
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
                const baseCount = attendeesFor().length;
                const hasMe = myPlans.has(key);
                const count = baseCount + (hasMe ? 1 : 0);
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
              {selectedAttendees.map((player, index) => (
                <span className="court-heatmap__person" key={`${player.initials}-${index}`}>
                  <i className={`court-player__avatar court-player__avatar--${player.tier}`}>{player.initials}</i>
                  <b>{player.name.split(" ")[0]}</b>
                  <small>Local</small>
                </span>
              ))}
              {!selectedCount ? (
                <span className="court-heatmap__nobody"><UsersThree size={19} weight="fill" /> Be the first local to set a time.</span>
              ) : null}
            </div>
            <div className="court-heatmap__selection-action">
              {selectedHasMe ? (
                <button type="button" onClick={removeSelectedPlan}><X size={15} weight="bold" /> Remove my time</button>
              ) : isLocal ? (
                <button type="button" onClick={() => selectSlot(selected.dayIndex, selected.timeIndex)}><Check size={15} weight="bold" /> I&apos;m going</button>
              ) : (
                <button type="button" onClick={makeLocal}><House size={15} weight="fill" /> Make this my local court</button>
              )}
            </div>
          </>
        ) : (
          <div className="court-heatmap__prompt"><UsersThree size={20} weight="fill" /><span><strong>Pick a time</strong><small>See who&apos;s going. Locals can add their plan with one tap.</small></span></div>
        )}
      </div>
      <p className="court-heatmap__announcement" role="status">{announcement}</p>
    </section>
  );
}
