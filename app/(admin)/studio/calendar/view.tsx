"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Tv,
  Camera,
  Clock,
  Sparkles,
  Plus,
  Flame,
  CheckCircle2,
  Sliders,
} from "lucide-react";
import { RECOMMENDED_IST_SLOTS, calendarService, ScheduledCalendarEvent } from "@/lib/services/calendar-service";

export function ContentCalendarView() {
  const [currentMonth, setCurrentMonth] = React.useState(1); // Jan
  const [currentYear, setCurrentYear] = React.useState(2025);
  const [events, setEvents] = React.useState<ScheduledCalendarEvent[]>(() =>
    calendarService.getEventsForMonth(2025, 1)
  );

  const [selectedDay, setSelectedDay] = React.useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState("");
  const [newPlatform, setNewPlatform] = React.useState<"YouTube Shorts" | "YouTube Long" | "Instagram Reel">("YouTube Shorts");

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const daysInMonth = 31;
  const startDayOfWeek = 3; // Wednesday for Jan 1 2025

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleOpenAddForDay = (day: number) => {
    setSelectedDay(day);
    setIsAddModalOpen(true);
  };

  const handleCreateScheduledEvent = () => {
    if (!selectedDay || !newTitle) return;

    const dateStr = `${currentYear}-${currentMonth < 10 ? "0" + currentMonth : currentMonth}-${
      selectedDay < 10 ? "0" + selectedDay : selectedDay
    }`;

    const bestSlot = calendarService.suggestBestSlot(dateStr, events, newPlatform);

    const newEv: ScheduledCalendarEvent = {
      id: "ev_" + Math.random().toString(36).substring(2, 7),
      projectId: "proj_custom",
      title: newTitle,
      teluguTitle: newTitle,
      platform: newPlatform,
      scheduledDate: dateStr,
      slot: bestSlot,
      status: "Queued",
      thumbnailUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80",
    };

    setEvents([...events, newEv]);
    setIsAddModalOpen(false);
    setNewTitle("");
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Content Calendar & Strategic Slotting"
        description="Schedule, coordinate, and auto-align Telugu video releases to peak audience attention windows in Asia/Kolkata timezone."
      >
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-border text-foreground font-medium px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 inline-block animate-pulse" />
            Timezone: Asia/Kolkata (IST +05:30)
          </Badge>
          <Button variant="primary" size="sm" onClick={() => handleOpenAddForDay(18)} className="gap-2">
            <Plus className="w-4 h-4" />
            Schedule New Release
          </Button>
        </div>
      </PageHeader>

      {/* Recommended Peak Windows Reference */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {RECOMMENDED_IST_SLOTS.map((slot) => (
          <div
            key={slot.id}
            className="p-3 rounded-xl bg-card border border-border shadow-card space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xs font-semibold text-muted-foreground uppercase tracking-wider">
                {slot.startTime} - {slot.endTime} IST
              </span>
              <Badge variant="brand" className="text-[10px] h-4 py-0">
                {slot.expectedViewerMultiplier}x Boost
              </Badge>
            </div>
            <p className="text-xs font-bold text-foreground line-clamp-1">{slot.name}</p>
            <p className="text-2xs text-muted-foreground line-clamp-2">{slot.description}</p>
          </div>
        ))}
      </div>

      {/* Calendar Header Controls */}
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">
              {monthNames[currentMonth - 1]} {currentYear}
            </CardTitle>
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="sm" onClick={handlePrevMonth} className="h-8 w-8 p-0">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => { setCurrentMonth(1); setCurrentYear(2025); }} className="h-8 text-xs">
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={handleNextMonth} className="h-8 w-8 p-0">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Day of Week Headers */}
          <div className="grid grid-cols-7 border-b border-border text-center text-xs font-semibold text-muted-foreground bg-muted/20">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="py-2.5 border-r border-border last:border-r-0">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid Days */}
          <div className="grid grid-cols-7 auto-rows-[130px]">
            {/* Empty slots for previous month days */}
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="border-b border-r border-border bg-muted/10 p-2" />
            ))}

            {/* Days of current month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${currentYear}-${currentMonth < 10 ? "0" + currentMonth : currentMonth}-${
                day < 10 ? "0" + day : day
              }`;
              const dayEvents = events.filter((e) => e.scheduledDate === dateStr);
              const isToday = day === 15;

              return (
                <div
                  key={`day-${day}`}
                  onClick={() => handleOpenAddForDay(day)}
                  className={`border-b border-r border-border p-2 transition-colors hover:bg-muted/30 cursor-pointer relative flex flex-col justify-between group ${
                    isToday ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold ${
                        isToday
                          ? "w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                          : "text-foreground"
                      }`}
                    >
                      {day}
                    </span>
                    <button
                      type="button"
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 text-muted-foreground hover:text-primary"
                      title="Add video to date"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1 my-1 overflow-y-auto max-h-[85px]">
                    {dayEvents.map((ev) => (
                      <div
                        key={ev.id}
                        className={`text-[10px] p-1 rounded-md border truncate font-medium flex items-center gap-1 ${
                          ev.platform === "YouTube Shorts"
                            ? "bg-red-500/10 border-red-500/30 text-red-400"
                            : ev.platform === "Instagram Reel"
                            ? "bg-pink-500/10 border-pink-500/30 text-pink-400"
                            : "bg-blue-500/10 border-blue-500/30 text-blue-400"
                        }`}
                        title={`${ev.teluguTitle} (${ev.slot.startTime} IST)`}
                      >
                        {ev.platform.includes("YouTube") ? (
                          <Tv className="w-2.5 h-2.5 shrink-0" />
                        ) : (
                          <Camera className="w-2.5 h-2.5 shrink-0" />
                        )}
                        <span className="truncate">{ev.teluguTitle}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-[9px] text-muted-foreground text-right">
                    {dayEvents.length > 0 ? `${dayEvents.length} scheduled` : ""}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Add Scheduled Video Dialog */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Video for Day {selectedDay} {monthNames[currentMonth - 1]}</DialogTitle>
            <DialogDescription>
              Assign a Telugu video to an optimal Asia/Kolkata audience slot with automated spacing.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Video Title / Project Name
              </label>
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. పల్లెటూరి సంక్రాంతి జ్ఞాపకాలు - ఎపిసోడ్ 2"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Target Format</label>
              <Select
                value={newPlatform}
                onChange={(e) =>
                  setNewPlatform(e.target.value as "YouTube Shorts" | "YouTube Long" | "Instagram Reel")
                }
                options={[
                  { label: "YouTube Shorts (9:16)", value: "YouTube Shorts" },
                  { label: "Instagram Reel (9:16)", value: "Instagram Reel" },
                  { label: "YouTube Long-form (16:9)", value: "YouTube Long" },
                ]}
              />
            </div>

            <div className="p-3 rounded-lg bg-muted/40 border border-border text-2xs space-y-1">
              <span className="font-semibold text-foreground block">
                Recommended Auto-Slot by Calendar Service:
              </span>
              <p className="text-muted-foreground">
                Prime Evening Slot (18:00 - 19:30 IST) • 1.65x viewership velocity boost.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateScheduledEvent} disabled={!newTitle}>
              Confirm Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

